import { generateProducts } from "./generateProducts";

async function main() {
 await generateProducts()
}

document.addEventListener("DOMContentLoaded", main);
