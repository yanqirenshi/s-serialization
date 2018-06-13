<page04-sec_root>
    <section-header title="CLASSES"></section-header>

    <section-container title="Class List" data={classes()}>
        <section-contents data={opts.data}>
            <div class="contents">
                <class-list data={opts.data}></class-list>
            </div>
        </section-contents>
    </section-container>

    <serialization-state></serialization-state>

    <section-footer></section-footer>

    <script>
     this.classes = ()=>{
         return STORE.state().get('classes');
     };
    </script>
</page04-sec_root>
