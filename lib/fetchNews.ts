import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
	category?: Category | string,
	keywords?: string,
	isDynamic?: boolean,
) => {
	const query = gql`
		query MyQuery(
			$access_key: String!
			$categories: String!
			$keywords: String
		){
			myQuery(
				access_key: $access_key
				categories: $categories
				keywords: $keywords
				sort: "published_desc"
				countries: "us"
			) {
				data {
					author
					category
					country
					description
					image
					language
					published_at
					source
					title
					url
				}
				pagination {
					count
					limit
					offset
					total
				}
			}
		}
	`;

	const res = await fetch("https://nuevedejulio.stepzen.net/api/pruning-sponge/__graphql", {
		method: "POST",
		cache: isDynamic ? "no-cache" : "default",
		next: isDynamic ? { revalidate: 0 } : { revalidate: 30 },
		headers: {
			"Content-Type": "application/json",
			Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
		},
		body: JSON.stringify({
			query,
			variables: {
				access_key: process.env.MEDIASTACK_API_KEY,
				categories: category,
				keywords: keywords,
			}
		}),
	});

	console.log(
		"Loading New DATA from API ========>",
		category,
		keywords,
	);

	const newsResponse = await res.json();
	const sortedRes = sortNewsByImage(newsResponse.data.myQuery);

	return sortedRes;

}

export default fetchNews;