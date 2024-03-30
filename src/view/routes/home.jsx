import React, { useEffect, useState } from "react"
import AppConfig from "../../constants/config";
import QuotesApi from "../../services/quotes-api";

export default function HomeRoute(){
    var quotesApi = new QuotesApi();
    const [quoteData, setQuoteData] = useState(null);

    useEffect(() => {
        getInitialRandomQuote();
    }, []);

    const getInitialRandomQuote = async () => {
        try {
            const result = await quotesApi.getRandomQuote();
            setQuoteData(result)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <div className="home">
            <main>
            {
                quoteData
                    ? <div className="quote-card">
                            <h1>{AppConfig.homeHeaderTitle}</h1>
                            <div class="card__content">
                                <span>
                                    <p class="card__description quote">{`"${quoteData.content}"`}</p>
                                    <p class="card__title author">~ {quoteData.author}</p>
                                    
                                </span>
                                <div className="options">
                                    <div>
                                        <span className="copy"><i class="fa fa-clone" aria-hidden="true"></i></span>
                                        <span className="tweet"><i class="fa fa-twitter" aria-hidden="true"></i></span>
                                    </div>
                                    <span className="reload"><i class="fa fa-refresh" aria-hidden="true"></i></span>
                                </div>
                            </div>
                     </div>
                    : <p>Quote loading...</p>
            }                
            </main>
        </div>
    );
}



 