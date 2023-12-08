import { Typography, Paper, Link, CardActionArea } from '@mui/material';
import Image from 'next/image';
import imgCover from "../../public/cover.webp";
import { formatDate } from '../functions/ConvertDate';
import { generateTruncatedText } from '../functions/generateTruncatedText';

export default function Articles({ journal }) {
  const maxTitleLength = 30;
  const truncatedTitle = generateTruncatedText(journal?.bibjson?.title, 30)
  const truncatedDescription = generateTruncatedText(journal?.bibjson?.title, 90)




  return (
    <CardActionArea href={journal.bibjson.link[0].url} target="_blank" rel="noopener noreferrer" sx={{
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}>
      <Paper
        elevation={3}
        sx={{
          minHeight: "730px",
          padding: '16px',
          overflow: "hidden"
        }}
      >
        <Typography color="primary" py={2} variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: "bold" }}>
          {truncatedTitle}
        </Typography>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          <Image src={imgCover} alt="Cover" width={250} objectFit="cover" borderRadius={8} sx={{ borderRadius: '8px' }} />
        </div>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Subjects:</strong> {journal.bibjson.subject.map((subj) => subj.term).join(', ')}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Language:</strong> {journal.bibjson.language?.join(', ')}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Publisher:</strong> {journal.bibjson.journal.publisher}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Serial Number (eissn):</strong> {journal.bibjson.journal.issns[1]}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Creation Date:</strong> {formatDate(journal.created_date)}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Link:</strong>{' '}
          <Link href={journal.bibjson.link[0].url} target="_blank" rel="noopener noreferrer">
            View Article
          </Link>
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          <strong>Abstract:</strong> {truncatedDescription}
        </Typography>
      </Paper>
    </CardActionArea>
  );
}
