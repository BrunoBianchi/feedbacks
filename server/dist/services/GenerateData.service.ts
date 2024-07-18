export class GenerateData {

    public generateScript(content: string) {
        const script = `
        const div = document.createElement('div');
        div.setAttribute('class','feedbacks-container');
        div.innerHTML='${content}';
        document.body.appendChild(div);
        `
        return script;
    }

    public generateCss(content: string) {
        const css = `
            ${content};
        `
        return css;
    }

}