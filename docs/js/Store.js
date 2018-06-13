class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    init () {
        let data = {
            classes: _CLASSES,
            operators: _OPERATORS,
            site: {
                active_page: 'page01',
                home_page: 'page01',
                pages: [
                    {
                        code: "page01",
                        title: "HOME",
                        menu_label: 'H',
                        active_section: 'root',
                        home_section: 'root',
                        sections: [
                            { code: 'root', tag: 'page01-sec_root', title: 'Section: root', description: '' }
                        ],
                        stye: {
                            color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                        }
                    },
                    {
                        code: "page02",
                        title: "永続化",
                        menu_label: '永',
                        active_section: 'root',
                        home_section: 'root',
                        sections: [{ code: 'root', tag: 'page02-sec_root', title: 'Home', description: '' }],
                        stye: {
                            color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                        }
                    },
                    {
                        code: "page03",
                        title: "カスタマイズ",
                        menu_label: 'カ',
                        active_section: 'root',
                        home_section: 'root',
                        sections: [{ code: 'root', tag: 'page03-sec_root', title: 'Home', description: '' }],
                        stye: {
                            color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                        }
                    },
                    {
                        code: "page04",
                        title: "CLASSES",
                        menu_label: 'C',
                        active_section: 'root',
                        home_section: 'root',
                        sections: [{ code: 'root', tag: 'page04-sec_root', title: 'Home', description: '' }],
                        stye: {
                            color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                        }
                    },
                    {
                        code: "page05",
                        title: "OPERATORS",
                        menu_label: 'O',
                        active_section: 'root',
                        home_section: 'root',
                        sections: [
                            { code: 'root',                     tag: 'page05-sec_root',          title: 'Home',                     description: '' },
                            { code: 'deserialize-sexp',         tag: 'deserialize-sexp',         title: 'deserialize-sexp',         description: '' },
                            { code: 'deserialize-xml',          tag: 'deserialize-xml',          title: 'deserialize-xml',          description: '' },
                            { code: 'get-xml-parser-state',     tag: 'get-xml-parser-state',     title: 'get-xml-parser-state',     description: '' },
                            { code: 'known-object-id',          tag: 'known-object-id',          title: 'known-object-id',          description: '' },
                            { code: 'make-serialization-state', tag: 'make-serialization-state', title: 'make-serialization-state', description: '' },
                            { code: 'reset-known-slots',        tag: 'reset-known-slots',        title: 'reset-known-slots',        description: '' },
                            { code: 'reset',                    tag: 'reset',                    title: 'reset',                    description: '' },
                            { code: 'serializable-slots',       tag: 'serializable-slots',       title: 'serializable-slots',       description: '' },
                            { code: 'serialize-sexp-internal',  tag: 'serialize-sexp-internal',  title: 'serialize-sexp-internal',  description: '' },
                            { code: 'serialize-sexp',           tag: 'serialize-sexp',           title: 'serialize-sexp',           description: '' },
                            { code: 'serialize-type-matrix',    tag: 'serialize-type-matrix',    title: 'serialize-type-matrix',    description: '' },
                            { code: 'serialize-xml-internal',   tag: 'serialize-xml-internal',   title: 'serialize-xml-internal',   description: '' },
                            { code: 'serialize-xml',            tag: 'serialize-xml',            title: 'serialize-xml',            description: '' },
                            { code: 'set-known-object',         tag: 'set-known-object',         title: 'set-known-object',         description: '' }
                        ],
                        stye: {
                            color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                        }
                    }
                ]
            }
        };

        for (var i in data.site.pages) {
            let page = data.site.pages[i];
            for (var k in page.sections) {
                let section = page.sections[k];
                let hash = '#' + page.code;

                if (section.code!='root')
                    hash += '/' + section.code;

                section.hash = hash;
            }
        }


        this._contents = Immutable.Map(data);
        return this;
    }
}
