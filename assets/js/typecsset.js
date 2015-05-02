
$(document).ready(function () {
    init()
});

function init() {
    excludeCredits();
    $('body').css('display', 'none');
    $('body').fadeIn(1000);
    measure = Number($("#measure").attr("value"));
    size = Number($("#size").attr("value"));
    lead = Number($("#lead").attr("value"));
    pspace = Number($("#pspace").attr("value"));
    pindent = Number($("#pindent").attr("value"))
}
typeCssDefaults = {
    measure: {
        minVal: 100,
        maxVal: 1500,
        minMsg: "If that column gets any skinnier it&#8217;ll have an eating disorder. Fatten it up! ",
        maxMsg: "That&#8217;s a long line for a fella to follow. Why don&#8217;t you back that thing up?",
        minHd: "Too Narrow",
        maxHd: "Wide Load",
        override: !1
    },
    size: {
        minVal: 9,
        maxVal: 32,
        minMsg: "While designers and computers have no problem with tiny type, your actual readers may.",
        maxMsg: "We know large type is the new black and all, but let&#8217;s not get carried away.",
        minHd: "Nano Type",
        maxHd: "Ginormous Type",
        override: !1
    },
    lead: {
        minVal: "$('#size').val()",
        maxVal: "$('#size').val()*2",
        minMsg: "This ain&#8217;t coach class, how about a little foot room for those descenders?",
        maxMsg: "That next line down is a quite a leap for the eyes. Double spacing should suffice.",
        minHd: "Negative Lead",
        maxHd: "> Double Spaced",
        override: !1
    },
    pspace: {
        minVal: 0,
        maxVal: "$('#lead').val()",
        minMsg: "The same goes for the space between paragraphs and lines &#8212; a little breathing room.",
        maxMsg: "A pause is one thing, but let&#8217;s not aggravate acrophobia in our readers.",
        minHd: "Negative Lead",
        maxHd: "> Double Spaced",
        override: !1
    },
    pindent: {
        minVal: "$('#size').val()*-6",
        maxVal: "$('#size').val()*3",
        minMsg: "The outdent maximum is six times the type size, and could also be based on the lead.",
        maxMsg: "The indent maximum is three times the type size, and could also be based on the lead.",
        minHd: "Outdent Max",
        maxHd: "Indent Max",
        override: !1
    }
};

function reset() {
    measure = Number($("#measure").attr("value"));
    size = Number($("#size").attr("value"));
    lead = Number($("#lead").attr("value"));
    pspace = Number($("#pspace").attr("value"));
    pindent = Number($("#pindent").attr("value"))
}
$(document).ready(function () {
    createDropDown();
    setupKeys();
    $(".dropdown dt a").click(function () {
        $(".dropdown dd ul").toggle();
        var b = $(".dropdown dd ul li a.sel").position();
        b == null && (b = {
            top: 0
        });
        var c = $(".dropdown dd ul").scrollTop(),
            b = b.top + c;
        $(".dropdown dd ul").scrollTop(b)
    });
    $(document).bind("click", function (b) {
        $(b.target).parents().hasClass("dropdown") || $(".dropdown dd ul").hide()
    });
    $(".dropdown dd ul li a.opt").click(function () {
        var b = $(this).html();
        $(".dropdown dd ul li a").removeClass("sel");
        $(this).addClass("sel");
        $(".dropdown dt a").html(b);
        $(".dropdown dd ul").hide();
        b = $("#typeface");
        b.val($(this).find("span.value").html());
        b.change()
    })
});

function createDropDown() {
    var b = $("#typeface"),
        c = b.find("option[selected]"),
        b = $("optgroup", b);
    $("#typeSet").append('<dl id="target" class="dropdown"></dl>');
    $("#target").append('<dt><a href="#">' + c.text() + '<span class="value">' + c.val() + "</span></a></dt>");
    $("#target").append("<dd><ul></ul></dd>");
    b.each(function (b) {
        var c = $(this).attr("label"),
            f = "fontGroup" + b;
        $("#target dd ul").append('<li><a href="#" class="optGroup" onclick="toggleSublist(\'' + f + "')\">" + c + "</a></li>");
        $("option", this).each(function () {
            $("#target dd ul").append('<li class="' +
                f + '" style="padding-left:0px"><a href="#" class="opt" style="font-family:' + $(this).val() + '">' + $(this).text() + '<span class="value">' + $(this).val() + "</span></a></li>");
            $(".optGroup:eq(0)").attr("id", "tyk");
            $(".optGroup:eq(1)").attr("id", "fd");
            $(".optGroup:eq(2)").attr("id", "fsq");
            $(".optGroup:eq(3)").attr("id", "tus");
            $(".optGroup:eq(4)").attr("id", "mac");
            $(".optGroup:eq(5)").attr("id", "win")
        })
    })
}

function toggleSublist(b) {
    $("." + b).toggle("blind")
}
$(function () {
    $("#typeface").change(function () {
        $("#bodyCopy").css("font-family", $(this).val())
    })
});
$(document).keydown(function (b) {
    if (b.metaKey || b.altKey || b.ctrlKey || b.shiftKey) return !0;
    else {
        if (b.keyCode == "27") return $(".error").remove(), $("#measure").attr("value", measure), $("#size").attr("value", size), $("#lead").attr("value", lead), $("#pspace").attr("value", pspace), $("#pindent").attr("value", pindent), !1;
        if (b.keyCode == "77") return $("#measure").trigger("focus"), !1;
        if (b.keyCode == "83") return $("#size").trigger("focus"), !1;
        if (b.keyCode == "76") return $("#lead").trigger("focus"), !1;
        if (b.keyCode == "65") return $("#pspace").trigger("focus"), !1;
        if (b.keyCode == "78") return $("#pindent").trigger("focus"), !1
    }
});
$(function () {
    $("#bodyCopy").resizable({
        handles: "e",
        minWidth: 99,
        maxWidth: 1501,
        resize: function () {
            $("#measure").val($(this).width());
            $("#measure").change()
        }
    })
});
$(function () {
    $(".increase,.decrease").click(function (b) {
        b.preventDefault();
        var b = $(this).parent("fieldset").children("input:text"),
            c = parseFloat(b.val());
        $(this).hasClass("increase") ? b.val(c + 1) : b.val(c - 1);
        b.change()
    })
});
$(function () {
    $(".ui-resizable-e").click(function () {
        $("#measure").focus()
    })
});
$(function () {
    $("#measure").change(function (b) {
        if (checkForErrors(b)) {
            var b = $("#bodyCopy"),
                c = b.css("width"),
                d = parseFloat($(this).val(), 10),
                c = c.slice(-2);
            b.css("width", d + c)
        }
    });
    $("#size").change(function (b) {
        if (checkForErrors(b)) {
            $(this).focus();
            var b = $("#bodyCopy"),
                c = b.css("font-size"),
                d = parseFloat($(this).val(), 10),
                c = c.slice(-2);
            b.css("font-size", d + c)
        }
    });
    $("#lead").change(function (b) {
        if (checkForErrors(b)) {
            $(this).focus();
            var b = $("#bodyCopy"),
                c = b.css("line-height"),
                d = parseFloat($(this).val(), 10),
                c = c.slice(-2);
            b.css("line-height", d + c)
        }
    });
    $("#pspace").change(function (b) {
        if (checkForErrors(b)) {
            $(this).focus();
            var b = $("#bodyCopy p"),
                c = b.css("margin-bottom"),
                d = parseFloat($(this).val(), 10),
                c = c.slice(-2);
            b.css("margin-bottom", d + c)
        }
    });
    $("#pindent").change(function (b) {
        if (checkForErrors(b)) {
            $(this).focus();
            var b = $("#bodyCopy p + p"),
                c = $("#bodyCopy p"),
                d = b.css("text-indent"),
                e = parseFloat($(this).val(), 10),
                f = Math.abs(e),
                d = d.slice(-2);
            e >= 0 ? (c.css("margin-left", 0), c.css("text-indent", 0)) : (c.css("margin-left", f + d), c.css("text-indent",
                e + d));
            b.css("text-indent", e + d);
            excludeCredits()
        }
    })
});

function excludeCredits() {
    $("#cp").css({
        "margin-left": "0",
        "text-indent": "0"
    });
    $("#cp em").css({
        "font-weight": "normal",
        "font-style": "normal",
        "font-variant": "normal"
    })
}
$(function () {
    $("#positive").click(function () {
        $("body").removeClass("neg");
        $("body").addClass("pos");
        $("#bodyCopy p").css("color", "#222");
        $("#cp").css("color", "#999");
        return !1
    })
});
$(function () {
    $("#negative").click(function () {
        $("body").removeClass("pos");
        $("body").addClass("neg");
        $("#bodyCopy p").css("color", "#fff");
        $("#cp").css("color", "#666");
        return !1
    })
});
$(function () {
    $("#align>li").click(function () {
        $("#align>li").removeClass("selected");
        $(this).addClass("selected");
        $("#bodyCopy").css("text-align", this.id);
        return !1
    })
});
$(function () {
    var b = $("#bodyCopy > p > em");
    $("#bold").click(function () {
        $("#emphasis>li").removeClass("selected");
        $(this).addClass("selected");
        b.css("font-weight", this.id);
        b.css("font-style", "normal");
        b.css("font-variant", "normal");
        b.css("text-transform", "lowercase");
        excludeCredits();
        return !1
    })
});
$(function () {
    var b = $("#bodyCopy > p > em");
    $("#italic").click(function () {
        $("#emphasis>li").removeClass("selected");
        $(this).addClass("selected");
        b.css("font-weight", "normal");
        b.css("font-style", this.id);
        b.css("font-variant", "normal");
        b.css("text-transform", "lowercase");
        excludeCredits();
        return !1
    })
});
$(function () {
    var b = $("#bodyCopy > p > em");
    $("#small-caps").click(function () {
        $("#emphasis>li").removeClass("selected");
        $(this).addClass("selected");
        b.css("font-weight", "normal");
        b.css("font-style", "normal");
        b.css("font-variant", this.id);
        b.css("text-transform", "lowercase");
        excludeCredits();
        return !1
    })
});
$(function () {
    var b = $("#bodyCopy > p > em");
    $("#uppercase").click(function () {
        $("#emphasis>li").removeClass("selected");
        $(this).addClass("selected");
        b.css("font-weight", "normal");
        b.css("font-style", "normal");
        b.css("font-variant", "normal");
        b.css("text-transform", this.id);
        excludeCredits();
        return !1
    })
});
$(document).ready(function () {
    $("input[type=checkbox]").each(function () {
        $(this).wrap(function () {
            return '<span class="chkbox" />'
        })
    });
    $(".chkbox input[type=checkbox]").click(function () {
        $(this).parent().toggleClass("unchecked")
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(2)");
    $("#measureSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(2)");
    $(".ui-resizable-handle").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(3)");
    $("#sizeSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(4)");
    $("#leadSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(5)");
    $("#pspaceSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(5)");
    $("#pindentSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(6)");
    $("#alignSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
$(document).ready(function () {
    var b = $("#bodyCopy p:nth-child(7)");
    $("#emSet").hover(function () {
        b.stop().animate({
            color: "#d9411e"
        }, 500)
    }, function () {
        $("body").hasClass("pos") ? b.stop().animate({
            color: "#222"
        }, 300) : $("body").hasClass("neg") && b.stop().animate({
            color: "#FFF"
        }, 300)
    })
});
isKeydown = 0;
repeatTimeout = 100;

function updateKey(b, c) {
    if (isKeydown && (c == 40 || c == 38)) {
        var d = parseFloat($(b).val());
        c == 38 ? $(b).val(d + 1) : $(b).val(d - 1);
        $(b).change();
        setTimeout(updateKey, repeatTimeout, [b, c])
    }
}

function setupKeys() {
    $("#size, #lead, #pspace, #pindent, #pspace, #measure").keydown(function (b) {
        isKeydown = 1;
        updateKey(this, b.keyCode)
    });
    $("#size, #lead, #pspace, #pindent, #pspace, #measure").keyup(function (b) {
        isKeydown = 0;
        updateKey(this, b.keyCode)
    })
}

function checkForErrors(b) {
    var c = b.target,
        d = c.id,
        c = Number(c.value);
    isValid = !0;
    errorHd = errorMsg = "";
    var e = eval(typeCssDefaults[d].minVal),
        f = eval(typeCssDefaults[d].maxVal),
        g = typeCssDefaults[d].override;
    if (c < e && (isValid = !1, errorMsg = typeCssDefaults[d].minMsg, errorHd = typeCssDefaults[d].minHd, !g)) b.target.value = e;
    if (c > f && (isValid = !1, errorMsg = typeCssDefaults[d].maxMsg, errorHd = typeCssDefaults[d].maxHd, !g)) b.target.value = f;
    String(c).match(/^[-+]?[0-9]+$/) || (isValid = !1, errorMsg = "Got something you'd like to tell TypeCSSet? It likes it when you speak in round numbers.",
        errorHd = "Not An Integer");
    return isValid ? (removeErrorMsg(d), !0) : (displayErrorMsg(d, errorMsg, errorHd), b.preventDefault(), g ? !0 : !1)
}

function removeErrorMsg(b) {
    b = $("#" + b).parent("fieldset");
    $(".error", b).remove()
}

function displayErrorMsg(b, c, d) {
    var e = $("#" + b).parent("fieldset");
    $(".error", e).remove();
    e.position().left += e.width();
    $("#" + b).after(' <div class="error"><div class="error-inner"><h3>' + d + '<a href="#" onclick="closeError(this);return false;">close</a></h3><p>' + c + "</p></div></div>")
}

function closeError(b) {
    $(b).parents(".error").remove()
}
$(document).ready(function () {
    $(":text", "#UI").blur(function () {
        $(this).parents("fieldset").children(".error").remove()
    });
    $("html").click(function (b) {
        b.target.className == "increase" || b.target.className == "decrease" || $(".error").remove()
    })
});
$(document).ready(function () {
    $("form").submit(function (b) {
        b.preventDefault();
        return !1
    });
    setTimeout(function () {
        a = document.getElementsByTagName("form");
        for (i = 0; i < a.length; i++) a[i].reset()
    }, 5);
    setTimeout(function () {
        $("#typeface").attr("selectedIndex", 0);
        $(".dropdown dt a").html("Typeface &#8230;")
    }, 5)
});