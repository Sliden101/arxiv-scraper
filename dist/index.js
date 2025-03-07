"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetails = getDetails;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const utils_1 = require("./utils/utils");
function getAuthors($) {
    let authorDict = {};
    $('.authors a').each((i, element) => {
        const text = $(element).text();
        const href = $(element).attr('href');
        (0, utils_1.addEntry)(authorDict, text, href);
    });
    return authorDict;
}
function getPdf($) {
    let pdfLink;
    let links = [];
    $('#content > #abs-outer > .extra-services > .full-text > ul > li > a ').each((i, element) => {
        const href = $(element).attr('href');
        links.push(href);
    });
    pdfLink = "https://arxiv.org" + links[0];
    return pdfLink;
}
function getAbstract($) {
    let abstract;
    abstract = $('.abstract.mathjax').text();
    abstract = abstract.replace("Abstract:", "");
    abstract = abstract.replace(/^\s+|\s+$/gm, '');
    return abstract;
}
function getTitle($) {
    let title;
    title = $(".title.mathjax").text();
    title = title.replace("Title:", "");
    return title;
}
function getDateSubmitted($) {
    let date;
    date = $(".dateline").text();
    date = date.replace(/^\s+|\s+$/gm, '');
    return date;
}
function getSubject($) {
    let subject;
    subject = $('.tablecell.subjects').text();
    subject = subject.replace(/^\s+|\s+$/gm, '');
    return subject;
}
function getDetails(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let details;
        try {
            const res = yield axios_1.default.get(url);
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
            };
        }
        catch (err) {
            console.log(err);
        }
        return details;
    });
}
//# sourceMappingURL=index.js.map