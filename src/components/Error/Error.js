import React from 'react'

import { Section, Article, Title } from "./generic";
import "./style.css";

function Error({message}) {
    return (
        <div>
            <Section style={{
                padding: "0",
                marginTop: "250px"
            }} >
                <Title>{message}</Title>
                <Article >
                    <img 
                    src = "https://cdn.pixabay.com/photo/2017/04/09/12/45/error-2215702_1280.png" 
                    width="200" 
                    height="160"
                    alt="error_image"
                    />
                </Article>
            </Section>
        </div>

    )
}

export default Error