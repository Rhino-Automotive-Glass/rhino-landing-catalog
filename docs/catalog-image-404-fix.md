# Catalog image 404 issue and fix

## Summary

Some catalog products, including several Toyota records, were showing missing images because the stored product image URL returned `404`.

The visible symptom was:

- product cards loaded without the expected photo
- preview dialogs could also miss the image
- the browser console showed failed image requests

## Root cause

The underlying data problem came from the admin application at:

- `/Users/bersoriano/dev/rhino-catalog`

In that project, the old image blob used to be deleted before the updated product record was successfully saved. If the save did not complete, the database could keep a stale URL that pointed to a blob that no longer existed.

This landing app was only consuming the stored image URLs, so it surfaced the broken data directly.

## Fix applied in this project

This project now serves catalog images through a local proxy route instead of rendering remote blob URLs directly:

- `src/app/api/catalog-image/route.ts`
- `src/lib/catalog-image.ts`

The catalog UI now uses that safe image source in:

- `src/components/ProductCatalog.tsx`

The proxy route:

- accepts only approved Vercel Blob image URLs
- fetches the image server-side
- falls back to `/rhino-logo.png` when the remote blob is missing, invalid, or unavailable

This means existing stale records now fail gracefully instead of producing raw broken image requests in the browser UI.

## Important operational note

This project now handles bad stored image URLs safely, but it does **not** repair the source product data by itself.

Already-broken records still need a real image re-upload or a data correction in the upstream admin app if you want the real product photos to appear again.

## Related project

The upstream save-flow bug was fixed in:

- `/Users/bersoriano/dev/rhino-catalog/docs/catalog-image-404-fix.md`
