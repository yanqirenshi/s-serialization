<deserialize-xml>
    <section-3 title="Function: DESERIALIZE-XML">
    </section-3>

    <section-3 title="コール・スタック">
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
    </section-3>
</deserialize-xml>
