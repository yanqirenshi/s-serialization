<home_page>

    <section-header title="Hole (S-SERIALIZATION)"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <home-page_tab-readme    class="hide"></home-page_tab-readme>
        <home-page_tab-usage     class="hide"></home-page_tab-usage>
        <home-page_tab-classes   class="hide"></home-page_tab-classes>
        <home-page_tab-operators class="hide"></home-page_tab-operators>
        <home-page_tab-packages  class="hide"></home-page_tab-packages>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme',    label: 'README',    tag: 'home-page_tab-readme' },
         {code: 'usage',     label: 'Usage',     tag: 'home-page_tab-usage' },
         {code: 'operators', label: 'Operators', tag: 'home-page_tab-operators' },
         {code: 'classes',   label: 'Classes',   tag: 'home-page_tab-classes' },
         {code: 'packages',  label: 'Packages',  tag: 'home-page_tab-packages' },
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

</home_page>
