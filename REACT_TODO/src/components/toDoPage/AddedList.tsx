import styled from "styled-components";

function AddedList({ data }: { data: string[] }) {
    return (
        <div>
            <InsideWrapper>
                {data?.map((title: string) => (
                    <p>{title}</p>
                ))}
            </InsideWrapper>
        </div>
    )
}

export default AddedList;

const InsideWrapper = styled.div`
    position: absolute;
    width: 306px;
    z-index: 10000;
    background-color: grey;
`