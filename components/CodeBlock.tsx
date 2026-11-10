"use client";
import {useState} from "react";
export function CodeBlock({code,title="Python example"}:{code:string;title?:string}){const [copied,setCopied]=useState(false);async function copy(){try{await navigator.clipboard.writeText(code);setCopied(true);window.setTimeout(()=>setCopied(false),1400)}catch{setCopied(false)}}return <div className="code"><div className="code-head"><span>{title}</span><button onClick={copy}>{copied?"Copied":"Copy code"}</button></div><pre><code>{code}</code></pre></div>}
