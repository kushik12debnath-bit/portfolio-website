interface SplitTextOptions {
  type?: string;
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
}

interface CharWordElement extends HTMLElement {
  _lineIndex?: number;
}

class SplitText {
  private elements: HTMLElement[];
  private originals: string[] = [];
  private opts: SplitTextOptions;

  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  constructor(target: string | HTMLElement | HTMLElement[], options: SplitTextOptions = {}) {
    this.opts = options;
    if (typeof target === 'string') {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else {
      this.elements = target;
    }
    this.elements.forEach(el => {
      this.originals.push(el.innerHTML);
    });
    this.split();
  }

  private split() {
    const types = this.opts.type ? this.opts.type.split(",").map(t => t.trim()) : ["chars"];

    for (const element of this.elements) {
      const text = element.textContent || "";
      element.innerHTML = "";

      if (types.includes("words") || types.includes("lines")) {
        this.splitIntoWords(element, text, types);
      } else if (types.includes("chars")) {
        this.splitIntoChars(element, text);
      }
    }
  }

  private splitIntoWords(element: HTMLElement, text: string, types: string[]) {
    const wordStrings = text.split(/\s+/).filter(w => w.length > 0);
    const wordSpans: HTMLElement[] = [];

    const fragment = document.createDocumentFragment();
    wordStrings.forEach((word, i) => {
      if (i > 0) fragment.appendChild(document.createTextNode(" "));

      if (types.includes("chars")) {
        const wordContainer = document.createElement("span");
        wordContainer.style.display = "inline-block";
        wordContainer.style.whiteSpace = "nowrap";
        for (const ch of word) {
          const span = document.createElement("span");
          span.textContent = ch;
          if (this.opts.charsClass) span.classList.add(this.opts.charsClass);
          wordContainer.appendChild(span);
          this.chars.push(span);
        }
        fragment.appendChild(wordContainer);
        wordSpans.push(wordContainer);
      } else {
        const span = document.createElement("span");
        span.textContent = word;
        if (this.opts.wordsClass) span.classList.add(this.opts.wordsClass);
        fragment.appendChild(span);
        wordSpans.push(span);
        this.words.push(span);
      }
    });

    element.appendChild(fragment);

    if (types.includes("lines") && this.opts.linesClass) {
      const tops = wordSpans.map(w => w.getBoundingClientRect().top);
      const uniqueTops = [...new Set(tops.map(t => Math.round(t)))];
      const lineGroups: number[][] = [];
      uniqueTops.sort((a, b) => a - b);

      for (const t of uniqueTops) {
        const group: number[] = [];
        tops.forEach((top, i) => {
          if (Math.round(top) === t) group.push(i);
        });
        lineGroups.push(group);
      }

      const parent = element;
      const children = Array.from(parent.childNodes);

      parent.innerHTML = "";

      for (const group of lineGroups) {
        const lineDiv = document.createElement("div");
        lineDiv.classList.add(this.opts.linesClass);
        for (const idx of group) {
          const node = children[idx];
          if (node) {
            if (node.nodeType === Node.TEXT_NODE) {
              lineDiv.appendChild(node.cloneNode(true));
            } else {
              lineDiv.appendChild(node.cloneNode(true));
            }
          }
        }
        parent.appendChild(lineDiv);
        this.lines.push(lineDiv);
      }

      const newWordSpans = parent.querySelectorAll("span");
      this.chars = Array.from(parent.querySelectorAll(`span${this.opts.charsClass ? '.' + this.opts.charsClass : ''}`));
      this.words = Array.from(parent.querySelectorAll(`span${this.opts.wordsClass ? '.' + this.opts.wordsClass : ''}`));
    }
  }

  private splitIntoChars(element: HTMLElement, text: string) {
    const fragment = document.createDocumentFragment();
    let hasLines = false;
    const lines = text.split("\n");

    lines.forEach((line, li) => {
      if (li > 0) {
        fragment.appendChild(document.createElement("br"));
      }
      const lineContainer = document.createElement("span");
      if (this.opts.linesClass) {
        lineContainer.classList.add(this.opts.linesClass);
        hasLines = true;
      }
      lineContainer.style.display = "inline";

      for (const ch of line) {
        if (ch === " ") {
          lineContainer.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.textContent = ch;
          if (this.opts.charsClass) span.classList.add(this.opts.charsClass);
          this.chars.push(span);
          span.style.display = "inline";
          lineContainer.appendChild(span);
        }
      }
      fragment.appendChild(lineContainer);
      if (hasLines) this.lines.push(lineContainer);
    });

    element.innerHTML = "";
    element.appendChild(fragment);
  }

  revert() {
    this.elements.forEach((el, i) => {
      el.innerHTML = this.originals[i];
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export default SplitText;
