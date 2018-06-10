<page04>
    <section-header title="CLASSES">
        <h2 class="subtitle">
        </h2>
    </section-header>

    <section-3 title="Class List" data={classes()}>
        <h2 class="subtitle">クラスの一覧</h2>

        <div class="contents">
            <class-list data={this.opts.data}></class-list>
        </div>
    </section-3>

    <serialization-state></serialization-state>

    <get-xml-parser-state></get-xml-parser-state>
    <reset></reset>
    <reset-known-slots></reset-known-slots>
    <known-object-id></known-object-id>
    <set-known-object></set-known-object>

    <section-footer></section-footer>

    <script>
     this.classes = ()=>{
         return STORE.state().get('classes');
     };
    </script>
</page04>
