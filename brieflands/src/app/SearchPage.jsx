// import SearchJournal from "@/components/SearchJournal";
import Articles from "../components/Articles";
import { Grid } from "@mui/material";

export default async function SearchPage({ searchParams }) {
    console.log("searchParams", searchParams);
    const searchArticles = searchParams?.article;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}search/articles/${searchArticles}`,
        { next: { revalidate: 3600 } }
    );
    const { results } = await response?.json();
    console.log("articles", results);


    return (
        <div>
            <Grid container py={16} rowSpacing={1} columnSpacing={{ xs: 1, md: 2 }}>
                {results.slice(0, 4)?.map((journal) => <Grid key={journal.id} item xs={11} sm={6} md={4}>
                    <Articles journal={journal} />
                </Grid>)}
            </Grid>
        </div>
    );
}