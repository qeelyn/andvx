export default (options) => {
    const config = {
        prefix: 'base64::',
        rules: ['<link ', '{{'],
        ...options
    }

    return {
        name: 'vite-plugin-html',
        configResolved() {
            if (!(config.rules && config.rules.length)) {
                throw new Error(`required options.rules : array`);
            }
        },
        transform(code, id) {
            if (id.endsWith('.html')) {
                let codeAry = code.split('\n');
                codeAry = codeAry.map(item => {
                    let execute = false;
                    config.rules.forEach(proof => {
                        execute = execute || item.indexOf(proof) > -1;
                    })
                    return execute ? `${config.prefix}${btoa(item)}` : item
                })
                return codeAry.join('\n')
            }
        },
        transformIndexHtml(html) {
            let htmlAry = html.split('\n');
            htmlAry = htmlAry.map(item => {
                if (item.indexOf(config.prefix) === 0) {
                    return atob(item.replace(config.prefix, ''))
                } else {
                    return item;
                }
            })
            return htmlAry.join('\n')
        }
    }
};