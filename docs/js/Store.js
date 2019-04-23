class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'home_page',
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
