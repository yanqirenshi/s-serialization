<customize-page>

    <section-header title="カスタマイズ"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <customize-page_tab-readme class="hide"></customize-page_tab-readme>
        <customize-page_tab-tab1   class="hide"></customize-page_tab-tab1>
        <customize-page_tab-tab2   class="hide"></customize-page_tab-tab2>
        <customize-page_tab-tab3   class="hide"></customize-page_tab-tab3>
        <customize-page_tab-help   class="hide"></customize-page_tab-help>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'customize-page_tab-readme' },
         {code: 'tab1',   label: 'TAB1',   tag: 'customize-page_tab-tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'customize-page_tab-tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'customize-page_tab-tab3' },
         {code: 'help',   label: 'HELP',   tag: 'customize-page_tab-help' },
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

</customize-page>
