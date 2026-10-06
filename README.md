# International Shipping Customs

面向国际集运用户的高频海关规则查询工具，覆盖澳大利亚、美国、加拿大和英国。首发提供 40 条官方来源支撑的双语记录、静态网页和 npm CLI。

[打开在线查询工具](https://spidertrans-labs.github.io/international-shipping-customs/)

## What is included

- AU、US、CA、UK 四国高频品类限制与申报提示
- 食品零食、肉类乳制品、药品、营养品、化妆品、电池、电子产品、酒精烟草、种子植物、液体喷雾
- 每条记录包含官方来源、限制状态、运输条件和核验日期
- 中英文网页与 CLI 输出
- JSON 和 CSV 下载
- Zod 数据契约、自动校验和来源链接检查

## CLI

```bash
npx @spidertrans/customs-cli countries
npx @spidertrans/customs-cli check --country AU --item battery
npx @spidertrans/customs-cli search "protein powder" --country CA
npx @spidertrans/customs-cli check --country UK --item perfume --json
```

`--json` 输出只包含数据，便于脚本和业务系统直接集成。

## Local development

```bash
pnpm install
pnpm dev
```

完整校验：

```bash
pnpm check
```

## Data model

数据定义位于 `packages/data`，类型与校验规则位于 `packages/schema`。网页和 CLI 共用同一份数据，避免多端规则漂移。

每条记录要求：

- `itemZh` / `itemEn`
- `status`: `allowed`、`conditional`、`restricted` 或 `prohibited`
- `conditionsZh` / `conditionsEn`
- `declarationNotesZh` / `declarationNotesEn`
- `sourceUrl`
- `verifiedAt`

## Contributing

欢迎提交官方来源更新。请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)，不要在公开 Issue 中提交个人信息、运单号或客户资料。

## Disclaimer

本项目提供一般信息，不构成清关、税务或法律意见。海关规则、税率和许可要求可能变化，发货前请以目的国主管机关和承运商的最新要求为准。

---

红蜘蛛集运提供专业的国际物流集运服务，注册即可获取仓库地址：

[https://spidertrans.cn/register-shipping?utm_source=github&utm_medium=referral&utm_campaign=international_shipping_customs&utm_content=readme](https://spidertrans.cn/register-shipping?utm_source=github&utm_medium=referral&utm_campaign=international_shipping_customs&utm_content=readme)

Spidertrans provides international consolidation services for Australia, the United States, Canada, and the United Kingdom. Register to receive a China warehouse address and manage parcels in the customer portal.

Contact: `info@spidertrans.com` · `+86 185 0105 3570` · WeChat `HZZ99119`

## License

- Code: [MIT](./LICENSE)
- Data: [CC BY 4.0](./LICENSE-DATA)
