import axios from 'axios';
import * as cheerio from 'cheerio';
import { type Dictionary, type PaperObject, addEntry} from '../utils/utils';


function getAuthors($: any){
    let authorDict: Dictionary<string>={};
    $('.authors a').each((i: any, element: any)=> {
        const text = $(element).text();
        const href = $(element).attr('href');
        addEntry(authorDict, text,href);
    })
    return authorDict;
}

function getPdf($:any){
    let pdfLink: string;
    let links = [];
    $('#content > #abs-outer > .extra-services > .full-text > ul > li > a ').each((i: any, element: any) =>{
        const href = $(element).attr('href');
        links.push(href);
    })
    pdfLink = "https://arxiv.org"+links[0];
    return pdfLink;
}

function getAbstract($:any){
    let abstract: string;
    abstract = $('.abstract.mathjax').text();
    abstract=abstract.replace("Abstract:","");
    abstract=abstract.replace(/^\s+|\s+$/gm,''); 
    return abstract;
}

function getTitle($:any){
    let title: string;
    title = $(".title.mathjax").text();
    title = title.replace("Title:","");
    return title;
}

function getDateSubmitted($:any){
    let date: string;
    date = $(".dateline").text();
    date = date.replace(/^\s+|\s+$/gm,''); 
    return date;
}

function getSubject($:any){
    let subject: string;
    subject = $('.tablecell.subjects').text();
    subject = subject.replace(/^\s+|\s+$/gm,'');
    return subject;
}

export async function getDetails(url: string){
    let details: PaperObject;
    try {
        const res = await axios.get(url);
        const html = res.data;
        const $ = cheerio.load(html);
        
        let title = getTitle($);
        let date = getDateSubmitted($);
        let subject = getSubject($);
        let abstract = getAbstract($);
        let authors = getAuthors($);
        let pdfLink = getPdf($);

        details = {
            title: title,
            date: date,
            subject: subject,
            abstract: abstract,
            authors: authors,
            pdfLink: pdfLink,
        }
        
    } catch(err) {
        console.log(err);
    }
    return details;
} 