function fill(area)
    {
    var select = document.getElementById(area + "_mix2"); 
    for(var i = select.options.length; i >0 ; i--) {
    select.remove(select.selectedIndex);
    }
    var item = document.getElementById(area+"_mix"); 
    if(item.options[item.selectedIndex].value==0)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = area + "_mix";
        select.appendChild(all);
    }
    else if(item.options[item.selectedIndex].value==1)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = "341";
        select.appendChild(all);
        var el = document.createElement("option");
        el.textContent = "Type C";
        el.value = "341c";
        select.appendChild(el);
        var el2 = document.createElement("option");
        el2.textContent = "Type D";
        el2.value = "341d";
        select.appendChild(el2);
        var el3 = document.createElement("option");
        el3.textContent = "Type F";
        el3.value = "341f";
        select.appendChild(el3);
    }
    else if(item.options[item.selectedIndex].value==2)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = "342";
        select.appendChild(all);
        var el = document.createElement("option");
        el.textContent = "PFC-AR";
        el.value = "pfc_ar";
        select.appendChild(el);
        var el2 = document.createElement("option");
        el2.textContent = "PFC-PG";
        el2.value = "pfc_pg";
        select.appendChild(el2);
    }
    else if(item.options[item.selectedIndex].value==3)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = "344";
        select.appendChild(all);
        var el = document.createElement("option");
        el.textContent = "CMHB-C";
        el.value = "cmhb_c";
        select.appendChild(el);
        var el2 = document.createElement("option");
        el2.textContent = "CMHB-F";
        el2.value = "cmhb_f";
        select.appendChild(el2);/*
        var el3 = document.createElement("option");
        el3.textContent = "SP-A";
        el3.value = "spa";
        select.appendChild(el3);
        var el4 = document.createElement("option");
        el4.textContent = "SP-B";
        el4.value = "spb";
        select.appendChild(el4);*/
        var el4 = document.createElement("option");
        el4.textContent = "SP-C";
        el4.value = "spc";
        select.appendChild(el4);
        var el5 = document.createElement("option");
        el5.textContent = "SP-D";
        el5.value = "spd";
        select.appendChild(el5);
    }
    else if(item.options[item.selectedIndex].value==4)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = "346";
        select.appendChild(all);
        var el3 = document.createElement("option");
        el3.textContent = "SMA-C";
        el3.value = "sma_c";
        select.appendChild(el3);
        var el = document.createElement("option");
        el.textContent = "SMA-D";
        el.value = "sma_d";
        select.appendChild(el);
        var el2 = document.createElement("option");
        el2.textContent = "SMAR-F";
        el2.value = "smar_f";
        select.appendChild(el2);
    }
    else if(item.options[item.selectedIndex].value==5)
    {
        var all = document.createElement("option");
        all.textContent = "All";
        all.value = "special";
        select.appendChild(all);
        var el3 = document.createElement("option");
        el3.textContent = "CAM";
        el3.value = "cam";
        select.appendChild(el3);
        var el = document.createElement("option");
        el.textContent = "LRA";
        el.value = "lra";
        select.appendChild(el);
        var el2 = document.createElement("option");
        el2.textContent = "TBPFC";
        el2.value = "tbpfc";
        select.appendChild(el2);/*
        var el2 = document.createElement("option");
        el2.textContent = "Microsurfacing";
        el2.value = "micro_surfacing";
        select.appendChild(el2);*/
    }
}