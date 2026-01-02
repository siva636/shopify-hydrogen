import { Await, useLoaderData, Link } from "react-router";
import type { Route } from "./+types/_index";
import { Suspense } from "react";
import { getPaginationVariables, Image } from "@shopify/hydrogen";
import type {
  FeaturedCollectionFragment,
  HomeCollectionFragment,
} from "storefrontapi.generated";
import { Button } from "~/components/ui/button";
import { TrendingUpIcon } from "lucide-react";
import { PaginatedResourceSection } from "~/components/PaginatedResourceSection";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Hydrogen | Home" }];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: Route.LoaderArgs) {
  const [{ collection }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY, {
      variables: { handle: "featuredcollection" },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {
    featuredCollection: collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, request }: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
  const collections = context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });
  return { collections };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-12">
      <FeaturedCollection collection={data.featuredCollection} />
      <Collections />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <div className="relative flex items-center justify-center">
            <Image
              className="md:hidden"
              data={image}
              sizes="100vw"
              aspectRatio="1/1"
            />
            <Image className="hidden md:block" data={image} sizes="100vw" />
            <div className="absolute text-center">
              <div className="py-2 text-center text-5xl text-white md:text-6xl lg:text-7xl lg:font-bold">
                <div>Elevate your lifestyle today.</div>
                <div>Tomorrow means never.</div>
              </div>

              <Button
                variant="outline"
                size="default"
                className="h-[60px] rounded-2xl text-xl font-bold"
              >
                <TrendingUpIcon className="m-1" />{" "}
                <span className="pr-3"> Elevate now</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export function Collections() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <div className="collections">
      <h1>Collections</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={collections}>
          {(response) => (
            <PaginatedResourceSection<HomeCollectionFragment>
              connection={response.collections}
              resourcesClassName="collections-grid"
            >
              {({ node: collection, index }) => (
                <CollectionItem
                  key={collection.id}
                  collection={collection}
                  index={index}
                />
              )}
            </PaginatedResourceSection>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: HomeCollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? "eager" : undefined}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h5>{collection.title}</h5>
      <p>{collection.description}</p>
    </Link>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query FeaturedCollection($handle: String!) {
  collection(handle: $handle) {
   ...FeaturedCollection
  }
}` as const;

const COLLECTIONS_QUERY = `#graphql
  fragment HomeCollection on Collection {
     id
    title
    description
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query HomeCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...HomeCollection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
