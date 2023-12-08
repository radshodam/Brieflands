"use client";

import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, Link } from '@mui/material';
import imgCover from "../../public/cover.webp";
import Image from 'next/image';

const SearchJournal = ({ searchParams }) => {
    console.log("searchParams", searchParams.article);
    const searchArticles = searchParams.article;
    const handleSearch = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}search/articles/${searchArticles}`
            );
            const data = await response.json();
            if (data.results) {
                setJournalsList(data.results);
            } else {
                console.error("Error in API response");
            }
        } catch (error) {
            console.error("Error during API call", error);
        }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [journalsList, setJournalsList] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    label="جستجو در مجلات"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    جستجو
                </Button>
            </Grid>

            {journalsList.map((journal) => (
                <Grid item xs={12} key={journal.id}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">{journal.bibjson.title}</Typography>
                        <Image src={imgCover} alt="Cover" style={{ maxWidth: '100%' }} />
                        <Typography>
                            <strong>موضوعات:</strong> {journal.bibjson.subject.map((subj) => subj.term).join(', ')}
                        </Typography>
                        <Typography>
                            <strong>زبان:</strong> {journal.bibjson.language?.join(', ')}
                        </Typography>
                        <Typography>
                            <strong>ناشر:</strong> {journal.bibjson.journal.publisher}
                        </Typography>
                        <Typography>
                            <strong>شماره سریال (eissn):</strong> {journal.bibjson.journal.issns[1]}
                        </Typography>
                        <Typography>
                            <strong>تاریخ ایجاد:</strong> {formatDate(journal.created_date)}
                        </Typography>
                        <Typography>
                            <strong>لینک:</strong>{' '}
                            <Link href={journal.bibjson.link[0].url} target="_blank" rel="noopener noreferrer">
                                مشاهده مقاله
                            </Link>
                        </Typography>
                        <Typography>
                            <strong>چکیده:</strong> {journal.bibjson.abstract}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchJournal;






