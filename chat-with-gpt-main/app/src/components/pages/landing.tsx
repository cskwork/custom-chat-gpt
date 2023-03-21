import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectOpenAIApiKey } from '../../store/api-keys';
import { openOpenAIApiKeyPanel } from '../../store/settings-ui';
import { Page } from '../page';

const Container = styled.div`
    flex-grow: 1;
    padding-bottom: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans", sans-serif;
    line-height: 1.7;
    gap: 1rem;
`;

export default function LandingPage(props: any) {
    const openAIApiKey = useAppSelector(selectOpenAIApiKey);
    const dispatch = useAppDispatch();
    const onConnectButtonClick = useCallback(() => dispatch(openOpenAIApiKeyPanel()), [dispatch]);

    return <Page id={'landing'} showSubHeader={true}>
        <Container>
            <p>
                <FormattedMessage defaultMessage={'Hello, how can I help you today?'}
                    description="A friendly message that appears at the start of new chat sessions" />
            </p>
            {!openAIApiKey && (
                <Button size="xs" variant="light" compact onClick={onConnectButtonClick}>
                    <FormattedMessage defaultMessage={'Connect your OpenAI account to get started'} />
                </Button>
            )}
        </Container>
    </Page>;
}

/*
This code snippet is a React functional component called LandingPage. It is styled using the @emotion/styled package and uses components from the @mantine/core library. 
It also leverages the react-intl package for internationalization and the Redux store to manage the application state.

Here's a breakdown of the main parts of this component:

Container: A styled div component is created using the @emotion/styled package. It is styled with flexbox to create a centered layout with a gap between elements, a specific font-family, and a line-height.

LandingPage function: The main functional component that receives props as an argument.

useAppSelector and useAppDispatch: These hooks are imported from the ../../store and are used to access the Redux store state and dispatch actions, respectively.

selectOpenAIApiKey: This selector function is imported from the ../../store/api-keys module and is used to retrieve the OpenAI API key from the Redux store.

openOpenAIApiKeyPanel: This action creator function is imported from the ../../store/settings-ui module and is used to dispatch an action that opens the OpenAI API key panel.

onConnectButtonClick: A useCallback hook is used to create a memoized callback function that dispatches the openOpenAIApiKeyPanel action when the "Connect your OpenAI account to get started" button is clicked.

Return statement: The component renders a Page component with the id set to "landing" and showSubHeader set to true. Inside the Container, a friendly message is displayed using the FormattedMessage component from the react-intl package. If the openAIApiKey is not set, it also renders a "Connect your OpenAI account to get started" button. When the button is clicked, the onConnectButtonClick callback is executed, opening the OpenAI API key panel.

This LandingPage component serves as the entry point for users and prompts them to connect their OpenAI account to get started with the chat functionality. The internationalization support allows the text to be easily translated into multiple languages, providing a more inclusive experience for users worldwide.

*/