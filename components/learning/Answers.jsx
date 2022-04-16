import { Stack, Button } from '@mui/material';

const Answers = ({words, selectAnswer}) => {
    return (
        <Stack sx={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}>
            {words.map((word, key) => (
                <Button key={key} onClick={() => selectAnswer(word)} variant="contained" sx={{ mr: 2, mb: 2}}>{word}</Button>
            ))}
        </Stack>
    )
}

export default Answers;