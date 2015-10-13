define(function (require) {

    return function (seriesType, defaultSymbolType, legendSymbol, ecModel, api) {
        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
            var data = seriesModel.getData();

            var symbolType = seriesModel.get('symbol') || defaultSymbolType;
            var symbolSize = seriesModel.get('symbolSize');

            data.setVisual({
                legendSymbol: legendSymbol || symbolType,
                symbol: symbolType,
                symbolSize: symbolSize
            });

            if (typeof symbolSize === 'function') {
                data.each(function (idx) {
                    var rawValue = data.getRawValue(idx);
                    data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue))
                });
            }
            data.each(function (idx) {
                var itemModel = data.getItemModel(idx);
                var symbolType = itemModel.get('symbol', true);
                var symbolSize = itemModel.get('symbolSize', true);
                if (symbolType != null && symbolType !== 'none') {
                    data.setItemVisual(idx, 'symbol', symbolType);
                    if (symbolSize != null) {
                        data.setItemVisual(idx, 'symbolSize', symbolSize);
                    }
                }
            });
        });
    };
});