<serialize-type-matrix>
    <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
            <tr>
                <th colspan="3">Sexp</th>
                <th colspan="2">Xml</th>
            </tr>
            <tr>
                <th>type</ty>
                <th>keyword</ty>
                <th>value</ty>
                <th>type</ty>
                <th>tag</ty>
            </tr>
        </thead>
        <tbody>
            <tr> <th>null</th>               <td>---</td>             <td>"NIL"</td>             <th>null</th>             <td>&lt;NULL/&gt;</td> </tr>
            <tr> <th>t</th>                  <td>---</td>             <td>"T"</td>               <th>t</th>                <td>&lt;TRUE/&gt;</td> </tr>
            <tr> <th>symbol</th>             <td>---</td>             <td>print-symbol</td>      <th>symbol</th>           <td>&lt;SYMBOL&gt;</td> </tr>
            <tr> <th>character</th>          <td>---</td>             <td>prin1</td>             <th>character</th>        <td>&lt;CHARACTER&gt; </td> </tr>
            <tr> <th>string</th>             <td>---</td>             <td>prin1</td>             <th>string</th>           <td>&lt;STRING&gt;</td> </tr>
            <tr> <th rowspan="4">number</th> <td rowspan="4">---</td> <td rowspan="4">prin1</td> <th>complex</th>          <td>&lt;COMPLEX&gt;</td> </tr>
            <tr>                                                                                 <th>float</th>            <td>&lt;FLOAT&gt;</td> </tr>
            <tr>                                                                                 <th>integer</th>          <td>&lt;INT&gt;</td> </tr>
            <tr>                                                                                 <th>ratio</th>            <td>&lt;RATIO&gt;</td> </tr>
            <tr> <th>hash-table</th>         <td>:HASH-TABLE</td>     <td></td>                  <th>hash-table</th>       <td>&lt;HASH-TABLE&gt;</td> </tr>
            <tr> <th>sequence</th>           <td>:SEQUENCE</td>       <td></td>                  <th>sequence</th>         <td>&lt;SEQUENCE&gt;</td> </tr>
            <tr> <th>standard-object</th>    <td>:OBJECT</td>         <td></td>                  <th>standard-object</th>  <td>&lt;OBJECT&gt;</td> </tr>
            <tr> <th>structure-object</th>   <td>:STRUCT</td>         <td></td>                  <th>structure-object</th> <td>&lt;STRUCT&gt;</td> </tr>
        </tbody>
    </table>
</serialize-type-matrix>
