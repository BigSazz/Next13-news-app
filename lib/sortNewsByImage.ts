export default function sortNewsByImage(news: NewsResponse) {
	const newsWithImage = news.data.filter((newsItem) => newsItem.image);
	const newsWithoutImage = news.data.filter((newsItem) => !newsItem.image);

	return {
		...news,
		data: [...newsWithImage, ...newsWithoutImage],
	};
}