import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// Map GitHub's color to contribution level
function getContributionLevel(color: string): number {
  // GitHub's contribution colors (light mode / dark mode)
  const colorMap: Record<string, number> = {
    "#ebedf0": 0, // No contributions
    "#161b22": 0, // No contributions (dark)
    "#9be9a8": 1, // 1-3 contributions
    "#0e4429": 1, // 1-3 contributions (dark)
    "#40c463": 2, // 4-6 contributions
    "#006d32": 2, // 4-6 contributions (dark)
    "#30a14e": 3, // 7-9 contributions
    "#26a641": 3, // 7-9 contributions (dark)
    "#216e39": 4, // 10+ contributions
    "#39d353": 4, // 10+ contributions (dark)
  };
  
  return colorMap[color.toLowerCase()] ?? 0;
}

async function fetchViaGraphQL(username: string, token?: string) {
  if (!token) {
    return null;
  }

  // Query for 2025 contributions
  const fromDate = "2025-01-01T00:00:00Z";
  const toDate = "2025-12-31T23:59:59Z";

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { 
          username,
          from: fromDate,
          to: toDate,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GraphQL error");
    }

    const calendar =
      data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return null;
    }

    const days: Array<{ date: string; count: number; level: number }> = [];
    let total = 0;

    // Flatten weeks into days array and filter to 2025 only
    calendar.weeks?.forEach((week: any) => {
      week.contributionDays?.forEach((day: any) => {
        const date = new Date(day.date);
        if (date.getFullYear() === 2025) {
          const count = day.contributionCount || 0;
          total += count;
          days.push({
            date: day.date,
            count,
            level: getContributionLevel(day.color || "#ebedf0"),
          });
        }
      });
    });

    return { contributions: days, total };
  } catch (error) {
    console.error("GraphQL API error:", error);
    return null;
  }
}

async function fetchViaScraping(username: string) {
  try {
    // Fallback: Fetch GitHub contribution graph SVG
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contributions");
    }

    const html = await response.text();

    // Parse SVG using regex to extract rect elements
    const rectRegex =
      /<rect[^>]*data-date="([^"]*)"[^>]*data-count="([^"]*)"[^>]*fill="([^"]*)"[^>]*>/g;
    const days: Array<{ date: string; count: number; level: number }> = [];
    let total = 0;
    let match;

    while ((match = rectRegex.exec(html)) !== null) {
      const dataDate = match[1];
      const dataCount = match[2];
      const fill = match[3];

      if (dataDate) {
        // Filter to only 2025 dates
        const date = new Date(dataDate);
        if (date.getFullYear() !== 2025) {
          continue;
        }

        const count = parseInt(dataCount || "0", 10);
        total += count;

        // Determine level based on fill color
        let level = 0;
        if (fill) {
          if (fill.includes("#ebedf0") || fill.includes("#161b22")) level = 0;
          else if (fill.includes("#9be9a8") || fill.includes("#0e4429"))
            level = 1;
          else if (fill.includes("#40c463") || fill.includes("#006d32"))
            level = 2;
          else if (fill.includes("#30a14e") || fill.includes("#26a641"))
            level = 3;
          else if (fill.includes("#216e39") || fill.includes("#39d353"))
            level = 4;
        }

        days.push({
          date: dataDate,
          count,
          level,
        });
      }
    }

    if (days.length === 0) {
      throw new Error("Could not parse contribution data");
    }

    return { contributions: days, total };
  } catch (error) {
    console.error("Scraping error:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Try GraphQL API first if token is available
    const githubToken = process.env.GITHUB_TOKEN;
    const graphQLResult = await fetchViaGraphQL(username, githubToken);

    if (graphQLResult) {
      return NextResponse.json(graphQLResult);
    }

    // Fallback to scraping if no token or GraphQL fails
    const scrapingResult = await fetchViaScraping(username);
    return NextResponse.json(scrapingResult);
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch contributions",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

