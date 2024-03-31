import React, { useEffect, useState } from "react"
import AppConfig from "../../constants/config";
import QuotesApi from "../../services/quotes-api";

export default function HomeRoute(){
    var quotesApi = new QuotesApi();
    const [quoteData, setQuoteData] = useState(null);
    const [quoteCopied, setQuoteCopied] = useState(false);

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    const fetchRandomQuote = async () => {
        try {
            const result = await quotesApi.getRandomQuote();
            setQuoteData(result)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getFormattedQuote = () => {
        if(!quoteData.content){
            return "\"quote it now\" ~ Someone";
        }
        const copiedQuote = `"${quoteData.content}" ~ ${quoteData.author ? quoteData.author : "Someone"}`;
        return copiedQuote;
    }

    const copyQuoteToClipboard = () => {
        const textarea = document.createElement("textarea");
        textarea.value = getFormattedQuote();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        setQuoteCopied(true);
        setTimeout(() => setQuoteCopied(false), 800);
    }

    const tweetQuote = () => {
        const formattedQuote = encodeURIComponent(getFormattedQuote());
    
        window.open(`https://twitter.com/intent/tweet?text=${formattedQuote}`, "_blank");
    };
    
    

    return (
        <div className="home">
            <main>
            
               <div className="quote-card">
                            <div className="card__initial">
                                <h1>{AppConfig.homeHeaderTitle}</h1>
                                <h3 className="sub_header">{AppConfig.homeHeaderSubTitle} 😊</h3>
                            </div>
                            <div className="card__content">
                                {
                                quoteData
                                ? <>
                                    <span className="quote-content">
                                        <p class="card__description quote">{`"${quoteData.content}"`}</p>
                                        <p class="card__title author">~ {quoteData.author}</p>
                                        
                                    </span>
                                    <div className="options">
                                        <div>
                                            <span className="option copy" onClick={copyQuoteToClipboard}>{quoteCopied ? <i class="fa fa-check-circle copied" aria-hidden="true"></i> :  <i class="fa fa-clone not-copied" aria-hidden="true"></i>}</span>
                                            <span className="option tweet" onClick={tweetQuote}><i class="fa fa-twitter" aria-hidden="true"></i></span>
                                        </div>
                                        <span className="option reload" onClick={fetchRandomQuote}><i class="fa fa-refresh" aria-hidden="true"></i></span>
                                    </div>
                                </>
                                : <p>Quote loading...</p>    
                                }
                            </div>
                     </div>
                     <br />
                     <div className="other-links">
                         <a className="my-twitter" target="_blank" href="https://twitter.com/@otmanicodes">@otmanicodes</a>
                         <a className="my-twitter" target="_blank" href="https://twitter.com/@otmanicodes">Buy Me a Coffee</a>
                     </div>
                    
                            
            </main>
        </div>
    );
}



 