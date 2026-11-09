#!/usr/bin/env node
// Read-only SFNT font inspection. No dependencies or font execution.
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export function inspect(bytes) {
 const b=Buffer.from(bytes);
 if(b.length<12)throw Error('Truncated font header');
 const sig=b.toString('ascii',0,4);
 if(b.readUInt32BE(0)!==0x00010000&&!['OTTO','true'].includes(sig))throw Error('Only uncompressed SFNT TTF/OTF supported; WOFF/WOFF2/TTC need another inspector');
 const count=b.readUInt16BE(4),tables={};
 if(12+count*16>b.length)throw Error('Truncated table directory');
 for(let i=0;i<count;i++){const o=12+i*16,tag=b.toString('ascii',o,o+4),start=b.readUInt32BE(o+8),length=b.readUInt32BE(o+12);if(start+length>b.length)throw Error('Truncated '+tag+' table');tables[tag]={start,length};}
 const os=tables['OS/2'];let weight=null;if(os&&os.length>=6)weight=b.readUInt16BE(os.start+4);
 const axes=[],v=tables.fvar;
 if(v){if(v.length<16)throw Error('Truncated fvar header');const start=v.start+b.readUInt16BE(v.start+4),n=b.readUInt16BE(v.start+8),size=b.readUInt16BE(v.start+10);if(size<20||start+n*size>v.start+v.length)throw Error('Invalid fvar axis records');for(let i=0;i<n;i++){const o=start+i*size;axes.push({tag:b.toString('ascii',o,o+4),min:b.readInt32BE(o+4)/65536,default:b.readInt32BE(o+8)/65536,max:b.readInt32BE(o+12)/65536});}}
 return {format:sig==='OTTO'?'OTF':'TTF',variable:Boolean(v),os2Weight:weight,axes};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 if(process.argv.length<3){console.error('Usage: node inspect-sfnt.mjs font.ttf [another.otf]');process.exitCode=1;}
 for(const path of process.argv.slice(2)){try{console.log(JSON.stringify({path:resolve(path),...inspect(await readFile(path))}));}catch(e){console.error(JSON.stringify({path,error:e.message}));process.exitCode=1;}}
}
