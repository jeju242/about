function generateListItem(sequence, collegeName) {
    let item = 
    `<section class="ftco-section-no-padding">\
        <div class="container-fluid px-3 px-md-0">\
            <div class="row justify-content-end">\
                <div class="hero-wrap col-md-10">\
                <div class="col-md-6 ftco-animate fadeInUp ftco-animated">\
                    <h4><a data-toggle="collapse" data-parent="#accordion" href="#collapse${sequence}">${collegeName}</a></h4>
                    <div id="collapse${sequence}" class="panel-collapse collapse in ftco-animated ftco-animate fadeInDown">`;
    for (let major in collegeInfoForList[collegeName]) {
        let xy = findXY(collegeName);
        item += `<div class="major">\
                    <a class="scroll" href="#map" onclick="panTo('${xy[0]}','${xy[1]}')">
                        ${major}
                    </a>\
                </div>`;
    }
                    // <p>국어국문학과</p>
                    // <p>영어영문학과</p>
    item+=`        </div>\ 
                </div>\
                </div>\
            </div>\
        </div>\
    </section>`;
    return item;
}

function drawList() {
    const list = document.getElementById('list')
    for (let i in collegeInfoForList) {
        list.insertAdjacentHTML('beforeend',generateListItem(i,i));
    }
}
drawList();