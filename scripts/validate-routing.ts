#!/usr/bin/env node

import { loadRoutingSuite } from "./routing-eval.ts";

const suite = await loadRoutingSuite();
const { skills, positive, negative, ambiguous, overlap } = suite.counts;

console.log(`Validated ${skills} skills with ${positive + negative + ambiguous + overlap} routing cases.`);
console.log(`positive=${positive} negative=${negative} ambiguous=${ambiguous} overlap=${overlap}`);
