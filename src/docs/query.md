# Best Practices for Querying in Payload CMS

This document outlines the best practices for querying data from Payload CMS in a Next.js environment, based on the official Payload CMS documentation. Following these guidelines will help you write efficient, secure, and maintainable code.

## 1. Accessing Payload

There are two primary ways to access the Payload instance:

### a) From `req` or `args`

In most places within Payload, such as Hooks, Access Control functions, and other config functions, you can access the `payload` object directly from the `req` object.

```typescript
import { CollectionAfterChangeHook } from 'payload/types';

const afterChangeHook: CollectionAfterChangeHook = async ({ req: { payload } }) => {
  const posts = await payload.find({
    collection: 'posts',
  });
};
```

### b) Using `getCachedPayload`

When you need to access Payload outside of the config functions, you should use the cached Payload client to improve performance. A `getCachedPayload` utility is provided in `src/payloadClient.ts`.

```typescript
import { getCachedPayload } from '@/payloadClient';

const payload = await getCachedPayload();
// Use payload to query your data
```

This will reuse the payload client instance instead of creating a new one on every request.

## 2. Choosing the Right Query Method

Payload provides different methods for querying data. Choose the one that best fits your needs.

*   **`payload.find({ collection, ...options })`**: Use this method to query a list of documents from a collection. It supports pagination, filtering, and sorting.
*   **`payload.findByID({ collection, id, ...options })`**: Use this to fetch a single document by its ID.
*   **`payload.findGlobal({ slug, ...options })`**: Use this to fetch a global.

## 3. Filtering with the `where` Clause

When you need to filter data, use the `where` clause. It provides a powerful way to filter your data based on different conditions.

```typescript
const products = await payload.find({
  collection: 'products',
  where: {
    and: [
      { category: { equals: 'interior' } },
      { status: { equals: 'published' } },
    ],
  },
});
```

## 4. Control Relationship Population with `depth`

The `depth` parameter controls how many levels of relationships are populated. A higher `depth` will result in more database queries and larger response sizes.

*   **`depth: 0`**: No relationships are populated. You will only get the IDs of related documents.
*   **`depth: 1` (default)**: Populates the first level of relationships.
*   **`depth: 2` or more**: Populates deeper levels of relationships.

Be mindful of the `depth` you use. Only request the data you need to avoid over-fetching.

```typescript
const product = await payload.findByID({
  collection: 'products',
  id: 'some-id',
  depth: 1, // Only populate the direct relationships
});
```

## 5. Security: `overrideAccess` and `user`

By default, Local API operations run with `overrideAccess: true`, bypassing all access control. This is useful for administrative tasks but can be a security risk.

When querying data on behalf of a user, **always** set `overrideAccess: false` and pass the `user` object to ensure that access control is enforced.

```typescript
const posts = await payload.find({
  collection: 'posts',
  user, // The user object
  overrideAccess: false, // Enforce access control
});
```

## 6. Error Handling

By default, Payload throws an error if a document is not found. You can change this behavior by setting `disableErrors: true`. In this case, `findByID` will return `null` and `find` will return an empty array if no documents are found.

```typescript
const product = await payload.findByID({
  collection: 'products',
  id: 'non-existent-id',
  disableErrors: true,
});

if (!product) {
  // Handle the case where the product is not found
}
```

## 7. Consider the GraphQL API

For complex queries, or when you need to fetch data from multiple resources in a single request, consider using the GraphQL API. It allows you to specify exactly what data you need, which can be more efficient than using the Local API for certain use cases.

## Conclusion

By following these best practices, you can ensure that your queries are efficient, secure, and easy to maintain. Always refer to the [Payload CMS documentation](https://payloadcms.com/docs) for more details on the available query options.
