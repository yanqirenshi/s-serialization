<persistence-page>

    <section-header title="永続化"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <persistence-page_tab-readme class="hide"></persistence-page_tab-readme>
        <persistence-page_tab-tab1   class="hide"></persistence-page_tab-tab1>
        <persistence-page_tab-tab2   class="hide"></persistence-page_tab-tab2>
        <persistence-page_tab-tab3   class="hide"></persistence-page_tab-tab3>
        <persistence-page_tab-help   class="hide"></persistence-page_tab-help>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'persistence-page_tab-readme' },
         {code: 'tab1',   label: 'Output format',   tag: 'persistence-page_tab-tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'persistence-page_tab-tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'persistence-page_tab-tab3' },
         {code: 'help',   label: 'HELP',   tag: 'persistence-page_tab-help' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
    </script>

</persistence-page>
