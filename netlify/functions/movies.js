export default async (request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  if (!search) {
    return new Response(JSON.stringify({error:"Movie name is required."}), {
      status:400, headers:{"Content-Type":"application/json"}
    });
  }

  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({error:"OMDb API key is not configured on Netlify."}), {
      status:500, headers:{"Content-Type":"application/json"}
    });
  }

  try {
    const searchResponse = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(search)}&type=movie`
    );
    const searchData = await searchResponse.json();

    if (searchData.Response === "False") {
      return new Response(JSON.stringify({error:searchData.Error||"Movie not found."}), {
        status:404, headers:{"Content-Type":"application/json"}
      });
    }

    const movies = (searchData.Search || []).slice(0,10);

    const details = await Promise.all(
      movies.map(async movie => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`
        );
        return await response.json();
      })
    );

    return new Response(JSON.stringify(details), {
      status:200, headers:{"Content-Type":"application/json"}
    });
  } catch {
    return new Response(JSON.stringify({error:"Unable to connect to OMDb API."}), {
      status:500, headers:{"Content-Type":"application/json"}
    });
  }
};
