# Movie Search App - Netlify Ready

This is a simple Movie Search App using HTML, CSS, JavaScript, Fetch API, Async/Await, OMDb API and a Netlify Function.

## Before hosting

You need your own active OMDb API key.

Do NOT put the key in `script.js`.

## Netlify setup

1. Extract this ZIP.
2. Upload/deploy the project to Netlify.
3. In your Netlify site, open Project configuration -> Environment variables.
4. Add:
   - Name: `OMDB_API_KEY`
   - Value: your OMDb API key
5. Redeploy the site.

## Test

After deployment, open:

`https://YOUR-SITE.netlify.app/.netlify/functions/movies?search=Titanic`

A successful response will be JSON.

If you get `OMDb API key is not configured on Netlify`, add the environment variable and redeploy.

If you get `Invalid API key!`, check/activate your OMDb key.

If you get an HTML/404 page, the Netlify Function was not deployed.

## Folder structure

Movie-Search-App/
- index.html
- style.css
- script.js
- netlify.toml
- netlify/functions/movies.js
