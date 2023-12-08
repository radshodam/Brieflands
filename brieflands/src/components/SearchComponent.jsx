'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDebounce } from 'use-debounce'
import { Box, Container, Input } from '@mui/material'

const SearchComponent = ({ search }) => {
    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState(search)
    const [query] = useDebounce(text, 400)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (!query) {
            router.push(`/`)
        } else {
            router.push(`/?article=${query}`)
        }
    }, [query])

    return (
        <Container maxWidth="md" mx="auto">
            <Box m="2rem" >
                <Input sx={{ width: "100%" }} variant="outlined" color="primary"
                    value={text}
                    placeholder='Search articles...'
                    onChange={e => setText(e.target.value)}
                />
            </Box>
        </Container>
    )
}

export default SearchComponent