import { useEffect } from "react";

function App() {
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await fetch("http://localhost:3000/todo")
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
            });
    };

    return <div className="text-red-100">hello</div>;
}

export default App;
