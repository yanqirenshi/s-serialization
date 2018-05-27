route(function (a) {
    let len = arguments.length;
    let page = arguments[0];
    let hash = location.hash;

    // hash が設定されていない場合は #page01 へ飛ぶ。
    if (hash.trim=='')
        return location.hash = '#page01';

    let new_pages = STORE.state().get('pages');
    let hash_code = hash.substring(1);

    // hash の値を '/' で分割し page と section のコードにわける。
    let hash_items = hash_code.split('/');
    let page_code = hash_items[0].trim();
    let section_code = hash_items[1] ? hash_items[1].trim() : '';

    // page が空の場合は #page01 へ飛ぶ
    if (page_code=='')
        return location.hash = '#page01';

    // 対象の page の active を true にし、それ以外の page の active を false にする。
    for (var k in new_pages)
        new_pages[k].active=(k==page_code);

    // 対象の section を選択する。
    if (new_pages[page_code].section)
        new_pages[page_code].section = (section_code=='' ? 'root' :section_code);

    // ページを移動する。
    STORE.dispatch(ACTIONS.movePage({
        pages: new_pages
    }));

    return null;
});
