import { styled } from "styled-components";
    
function Moniter({ logs } : { logs: { content: string, date: string }[] }) {
    const reversedLogs = logs ? [...logs].reverse() : [];

    return (
        <Wrapper>
            {reversedLogs.map(({ content, date }: { content: string, date: string }, idx) => (
                <p key={idx}>{`${date} : ${content}`}</p>
            ))}
        </Wrapper>
    );
}

export default Moniter;

const Wrapper = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    max-height: 500px;
    overflow-y: scroll;
    border: 1px solid white;
    padding: 10px;
`;