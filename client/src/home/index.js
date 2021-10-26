import React from "react";
import './index.css';



export default function Home() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [keyword, setKeyword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = (event) => {
        console.log(`
      Email: ${email}
      Password: ${password}
      Keyword:${keyword}
      Message: ${message}
    `);

        event.preventDefault()

        const payload =
        {
            searchString: `${keyword}`,
            postGroup: `${message}`,
            username: `${email}`,
            password: `${password}`
        }

        const url = 'http://127.0.0.1:3010/greeting/hello';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        fetch(url, options)
            .then(response => { return response.json(); })
            .then(res => { return res; })

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Facebook Scraper</h1>

            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </label>

            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
            </label>

            <label>
                Keyword:
                <input
                    name="name"
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    required />
            </label>

            <label>
                Message:
                <textarea
                    name="textarea"
                    type="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required />
            </label>


            <button>Submit</button>
        </form>
    );
}
