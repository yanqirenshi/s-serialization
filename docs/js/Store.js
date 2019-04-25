class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pagesOperatorFunctions () {
        return {
            code: "functions",
            children: [
                { code: 'deserialize-sexp',                   tag: 'deserialize-sexp' },
                { code: 'deserialize-sexp-internal',          tag: 'deserialize-sexp-internal' },
                { code: 'deserialize-xml',                    tag: 'deserialize-xml' },
                { code: 'deserialize-xml-finish-element',     tag: 'deserialize-xml-finish-element' },
                { code: 'deserialize-xml-finish-element-aux', tag: 'deserialize-xml-finish-element-aux' },
                { code: 'deserialize-xml-new-element',        tag: 'deserialize-xml-new-element' },
                { code: 'deserialize-xml-text',               tag: 'deserialize-xml-text' },
                { code: 'get-attribute-value',                tag: 'get-attribute-value' },
                { code: 'make-serialization-state',           tag: 'make-serialization-state' },
                { code: 'print-symbol',                       tag: 'print-symbol' },
                { code: 'print-symbol-xml',                   tag: 'print-symbol-xml' },
                { code: 'sequence-type-and-length',           tag: 'sequence-type-and-length' },
                { code: 'serialize-sexp',                     tag: 'serialize-sexp' },
                { code: 'serialize-xml',                      tag: 'serialize-xml' },
            ],
        };
    }
    pagesOperatorGenericFunctions () {
        return {
            code: "generic-functions",
            children: [
                { code: 'deserialize-xml-new-element-aux', tag: 'deserialize-xml-new-element-aux' },
                { code: 'get-serializable-slots',          tag: 'get-serializable-slots' },
                { code: 'get-xml-parser-state',            tag: 'get-xml-parser-state' },
                { code: 'known-object-id',                 tag: 'known-object-id' },
                { code: 'reset',                           tag: 'reset' },
                { code: 'reset-known-slots',               tag: 'reset-known-slots' },
                { code: 'serializable-slots',              tag: 'serializable-slots' },
                { code: 'serialize-sexp-internal',         tag: 'serialize-sexp-internal' },
                { code: 'serialize-xml-internal',          tag: 'serialize-xml-internal' },
                { code: 'set-known-object',                tag: 'set-known-object' },
            ],
        };
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'home_page',
                children: [
                    this.pagesOperatorFunctions(),
                    this.pagesOperatorGenericFunctions(),
                ],
            },
            {
                code: "persistence",
                menu_label: '永続',
                tag: 'persistence-page',
            },
            {
                code: "customize",
                menu_label: 'カス',
                tag: 'customize-page',
            },
        ];
    }
    init () {
        let data = {
            classes: _CLASSES,
            operators: _OPERATORS,
            packages: _PACKAGES,
            site: {
                active_page: 'home',
                home_page: 'home',
                pages: this.pages(),
            }
        };

        this._contents = Immutable.Map(data);
        return this;
    }
}
