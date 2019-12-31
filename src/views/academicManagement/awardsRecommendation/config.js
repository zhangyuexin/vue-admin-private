/**
 *
 * modular 模块名，如:评奖人员管理、个人评优、悦居寝室、先进班集体、国奖评比 ，目前定为：pjrygl,grpy,yjqs,xjbjt,gjpb
 * role    角色名，如:辅导员、学院、学生管理科、班长、班导师、学办主任、副院长目前定为：fdy,xy,xsglk,bz,bds,xbzr,fyz
 * switching  切换表格 如专业&年级与学生切换,值为type值
 * 左侧菜单 type值对应为：通过=1,未通过=2,上报=3,数据导出=4,驳回=5,公示=6,归档=7,导入综合测评=8,奖项重排=9,打印证书=10,初始化=11
 * 右侧菜单 type值对应为：专业&年级=1,学生=2,学院=3,寝室=4,班级=5,学校=6
 * handelMenu type值对应为：详情=1,通过=2,未通过=3,驳回=4,保存=5,修改等级=6,编辑=7,查看=8,审核=9,打印证书=10
 * optionData为下拉菜单内容，返回使用时获取添加进去
 * rowClickDetail为点击表格跳转的参数string数组，该参数为该列的prop,学生列表只需定义该属性即可
 * rowClickStatic为表格固定列，如果点击的是动态列，需要固定列来判断，学生列表不需定义
 */
export function getOtherConfig(modular, role, menuRightSelected) {
  role = role == "yz" ? "xy" : role;
  role = role == "fyz" ? "xy" : role;
  let key = modular + role;

  const RESULT = {
    /**
     * 评奖人员管理，角色依次为学办主任、学生管理科
     */
    pjryglxbzr: {
      menuLeft: [{
          name: "数据导出",
          type: 4
        },
        {
          name: "导入综合测评",
          type: 8
        }
      ],
      menuRight: {
        menuList: [{
            name: "专业&年级",
            type: 1
          },
          {
            name: "学生",
            type: 2
          }
        ],
        menuRightSelected
      }
    },
    pjryglxsglk: {
      menuLeft: [{
          name: "数据导出",
          type: 4
        },
        {
          name: "初始化",
          type: 11
        }
      ],
      menuRight: {
        menuList: [{
            name: "学院",
            type: 3
          },
          {
            name: "专业&年级",
            type: 1
          }
        ],
        menuRightSelected
      }
    },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  };
  return RESULT[key];
}

export function getTableConfig(modular, role, menuRightSelected) {
  role = role == "fyz" ? "xy" : role;
  role = role == "yz" ? "xy" : role;
  let key = modular + role + menuRightSelected;
  const RESULT = {
    /**
     * 评奖人员管理，角色依次为学办主任、学生管理科
     */
    pjryglxbzr1: {
      ...PJRYGL1
    },
    pjryglxbzr2: {
      searchCollocation: {
        firstRow: [{
            label: "学年度",
            placeholder: "请选择",
            value: "xnd",
            isInput: false,
            optionData: [],
            opLabel: "xndBm",
            opValue: "bm"
          },
          {
            label: "专业",
            placeholder: "请选择",
            value: "sszyBm",
            isInput: false,
            optionData: [],
            opLabel: "name",
            opValue: "bm"
          },
          {
            label: "年级",
            placeholder: "请选择",
            value: "njBm",
            isInput: false,
            optionData: [],
            opLabel: "name",
            opValue: "bm"
          },
          {
            label: "班级",
            placeholder: "请选择",
            value: "bjBm",
            isInput: false,
            optionData: [],
            opLabel: "name",
            opValue: "bm"
          }
        ],
        secondRow: [{
            label: "学号",
            placeholder: "请输入",
            value: "xh",
            isInput: true
          },
          {
            label: "姓名",
            placeholder: "请输入",
            value: "xm",
            isInput: true
          }
        ]
      },
      option: {
        ...OPTION,
        column: [{
            label: "序号",
            prop: "xuhao",
            width: 100
          },
          {
            label: "学年度",
            prop: "xnd",
            overHidden: true
          },
          {
            label: "学号",
            prop: "xh",
            overHidden: true
          },
          {
            label: "姓名",
            prop: "xm",
            overHidden: true
          },
          {
            label: "所属年级",
            prop: "njmc",
            overHidden: true
          },
          {
            label: "所属专业",
            prop: "zymc",
            overHidden: true,
            width: 150
          },
          {
            label: "所属班级",
            prop: "bjmc",
            overHidden: true,
            width: 150
          },
          {
            label: "综合评测排名",
            prop: "zhcppm",
            overHidden: true,
            width: 150
          },
          {
            label: "综合评测总分",
            prop: "zhcpzf",
            overHidden: true,
            width: 150
          },
          {
            label: "学业成绩",
            prop: "xycj",
            overHidden: true
          },
          {
            label: "德育成绩",
            prop: "dycj",
            overHidden: true
          },
          {
            label: "思想品德",
            prop: "sxpd",
            overHidden: true
          },
          {
            label: "社会工作",
            prop: "shgz",
            overHidden: true
          },
          {
            label: "科研及科技创新",
            prop: "kyjkjcx",
            overHidden: true,
            width: 180
          },
          {
            label: "文体活动",
            prop: "wthd",
            overHidden: true
          },
          {
            label: "集体建设",
            prop: "jtjs",
            overHidden: true
          }
        ]
      },
      handelMenu: [{
        content: "编辑",
        icon: "icon-ArtboardCopy761",
        type: 7
      }],
      interfaceName: "findPjryList",
      rowClickDetail: []
    },
    pjryglxsglk3: {
      searchCollocation: {
        firstRow: [{
            label: "学年度",
            placeholder: "请选择",
            value: "xnd",
            isInput: false,
            optionData: [],
            opLabel: "xndBm",
            opValue: "bm"
          },
          {
            label: "学院",
            placeholder: "请选择",
            value: "ssxyBm",
            isInput: false,
            optionData: [],
            opLabel: "mc",
            opValue: "bm"
          }
        ],
        secondRow: []
      },
      option: {
        ...OPTION,
        column: [{
            label: "序号",
            prop: "xuhao",
            width: 100
          },
          {
            label: "学年度",
            prop: "xnd",
            overHidden: true
          },
          {
            label: "学院",
            prop: "xymc",
            overHidden: true
          },
          {
            label: "总人数",
            prop: "xsrs",
            overHidden: true
          }
        ]
      },
      handelMenu: [{
        content: "查看",
        icon: "icon-chakan",
        type: 8
      }],
      interfaceName: "pjryglFindXyList",
      rowClickDetail: []
    },
    pjryglxsglk1: {
      searchCollocation: {
        firstRow: [{
            label: "学年度",
            placeholder: "请选择",
            value: "xnd",
            isInput: false,
            optionData: [],
            opLabel: "xndBm",
            opValue: "bm"
          },

          {
            label: "专业",
            placeholder: "请选择",
            value: "sszyBm",
            isInput: false,
            optionData: [],
            opLabel: "name",
            opValue: "bm"
          },
          {
            label: "年级",
            placeholder: "请选择",
            value: "njBm",
            isInput: false,
            optionData: [],
            opLabel: "name",
            opValue: "bm"
          }
        ],
        secondRow: []
      },
      option: {
        ...OPTION,
        column: [{
            label: "序号",
            prop: "xuhao",
            width: 100
          },
          {
            label: "学年度",
            prop: "xnd",
            overHidden: true
          },
          {
            label: "年级",
            prop: "njmc",
            overHidden: true
          },
          {
            label: "专业",
            prop: "zymc",
            overHidden: true
          },
          {
            label: "总人数",
            prop: "xsrs",
            overHidden: true
          },
          {
            label: "男生人数",
            prop: "nrs",
            overHidden: true
          },
          {
            label: "女生人数",
            prop: "nvrs",
            overHidden: true
          }
        ],
        menu: false
      },
      handelMenu: [],
      interfaceName: "pjryglFindNjZyList",
      rowClickDetail: []
    },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  };
  return RESULT[key];
}

const OPTION = {
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  page: true,
  selection: true,
  tip: false,
  menu: true,
  align: "center",
  menuAlign: "center",
  menuWidth: "180",
  index: false
};

const PJRYGL1 = {
  searchCollocation: {
    firstRow: [{
        label: "学年度",
        placeholder: "请选择",
        value: "xnd",
        isInput: false,
        optionData: [],
        opLabel: "xndBm",
        opValue: "bm"
      },
      {
        label: "专业",
        placeholder: "请选择",
        value: "sszyBm",
        isInput: false,
        optionData: [],
        opLabel: "name",
        opValue: "bm"
      },
      {
        label: "年级",
        placeholder: "请选择",
        value: "njBm",
        isInput: false,
        optionData: [],
        opLabel: "name",
        opValue: "bm"
      }
    ],
    secondRow: []
  },
  option: {
    ...OPTION,
    column: [{
        label: "序号",
        prop: "xuhao",
        width: 100
      },
      {
        label: "学年度",
        prop: "xnd",
        overHidden: true
      },
      {
        label: "年级",
        prop: "njmc",
        overHidden: true
      },
      {
        label: "专业",
        prop: "zymc",
        overHidden: true
      },
      {
        label: "总人数",
        prop: "xsrs",
        overHidden: true
      },
      {
        label: "男生人数",
        prop: "nrs",
        overHidden: true
      },
      {
        label: "女生人数",
        prop: "nvrs",
        overHidden: true
      }
    ]
  },
  handelMenu: [{
    content: "查看",
    icon: "icon-chakan",
    type: 8
  }],
  interfaceName: "pjryglFindNjZyList",
  rowClickDetail: []
};
