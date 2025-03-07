# arxiv-scraper
Scrape arxiv paper details

## Installation

```sh
npm i arxiv-scraper
```

### Usage Example
#### using try/catch
```js
import {getDetails} from "arxiv-scraper";

try{
    getDetails("https://arxiv.org/abs/2501.12599").then(details => {
        console.log(details)
    });
    
} catch(err){
    console.log(err)
}
```