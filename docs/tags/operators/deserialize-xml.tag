<deserialize-xml>
    <section-header-with-breadcrumb title="Function: DESERIALIZE-XML"></section-header-with-breadcrumb>

    <section-container title="コール・スタック">
        <section-contents>
            <div class="contents">
                <p>
                    <pre>
deserialize-xml
   |
   `--- get-xml-parser-state
           |
           `---> s-xml:xml-parser-state
                    |
                    +---> deserialize-xml-text
                    |
                    +---> deserialize-xml-new-element --> deserialize-xml-new-element-aux
                    |
                    `---> deserialize-xml-finish-element --> deserialize-xml-finish-element-aux
                    </pre>
                </p>
            </div>
        </section-contents>
    </section-container>
</deserialize-xml>
