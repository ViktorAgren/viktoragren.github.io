import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Terminal, Activity, Clock, TrendingUp, TrendingDown } from "lucide-react";

export const TerminalShowcase = () => {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const chartContainerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [output, setOutput] = useState([
    {
      type: "info",
      content: [
        "Welcome to trading_terminal v1.0.0",
        'Type "help" to see available commands',
        'Type "trade start" to begin simulation',
      ],
    },
  ]);
  const [priceData, setPriceData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(45250.00);
  const [isTrading, setIsTrading] = useState(false);
  const [volatility, setVolatility] = useState(0.002);
  const [timeframe, setTimeframe] = useState('1m');
  const [showVolume, setShowVolume] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);
  const lastCandleRef = useRef({ open: 45250, high: 45250, low: 45250, close: 45250 });
  const trendRef = useRef(0);
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    positions: {},
    history: [],
  });

  // Generate realistic OHLC candlestick data
  const generateNewCandle = useCallback(() => {
    const momentum = 0.85;
    const meanReversion = 0.05;
    const basePrice = 45250;
    
    // Update trend with momentum and mean reversion
    const randomComponent = (Math.random() - 0.5) * volatility;
    const meanReversionComponent = meanReversion * (basePrice - lastCandleRef.current.close) / basePrice;
    
    trendRef.current = momentum * trendRef.current + (1 - momentum) * (randomComponent + meanReversionComponent);
    
    // Generate OHLC data
    const open = lastCandleRef.current.close;
    const baseClose = open * (1 + trendRef.current);
    
    // Add some randomness to create realistic candle wicks
    const wickMultiplier = 0.3 + Math.random() * 0.7; // 0.3 to 1.0
    const bodySize = Math.abs(baseClose - open);
    const maxWick = bodySize * 2 + open * 0.001; // Realistic wick size
    
    // Determine if bullish or bearish
    const isBullish = baseClose >= open;
    
    let high, low, close;
    
    if (isBullish) {
      close = baseClose;
      high = Math.max(open, close) + (Math.random() * maxWick * wickMultiplier);
      low = Math.min(open, close) - (Math.random() * maxWick * 0.5);
    } else {
      close = baseClose;
      low = Math.min(open, close) - (Math.random() * maxWick * wickMultiplier);
      high = Math.max(open, close) + (Math.random() * maxWick * 0.5);
    }
    
    // Generate volume (higher volume on larger price moves)
    const priceMove = Math.abs(close - open) / open;
    const baseVolume = 50 + Math.random() * 200;
    const volume = Math.round(baseVolume * (1 + priceMove * 10));
    
    const timeInSeconds = Math.floor(Date.now() / 1000);
    
    const newCandle = {
      time: timeInSeconds,
      timestamp: new Date().toLocaleTimeString(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: volume,
      // Technical indicators (calculated later)
      ma20: 0,
      ma50: 0,
    };
    
    lastCandleRef.current = newCandle;
    return newCandle;
  }, [volatility]);

  // Calculate technical indicators
  const calculateIndicators = useCallback((data) => {
    return data.map((candle, index) => {
      // Calculate 20-period moving average
      const ma20Start = Math.max(0, index - 19);
      const ma20Data = data.slice(ma20Start, index + 1);
      const ma20 = ma20Data.reduce((sum, c) => sum + c.close, 0) / ma20Data.length;
      
      // Calculate 50-period moving average
      const ma50Start = Math.max(0, index - 49);
      const ma50Data = data.slice(ma50Start, index + 1);
      const ma50 = ma50Data.reduce((sum, c) => sum + c.close, 0) / ma50Data.length;
      
      return {
        ...candle,
        ma20: Number(ma20.toFixed(2)),
        ma50: Number(ma50.toFixed(2)),
      };
    });
  }, []);

  // Generate initial OHLC data
  useEffect(() => {
    const initialData = [];
    let currentCandle = { open: 45250, high: 45250, low: 45250, close: 45250 };

    for (let i = 0; i < 50; i++) {
      // Generate realistic OHLC for historical data
      const open = currentCandle.close;
      const changePercent = (Math.random() - 0.5) * 0.004; // ±0.4% change
      const close = open * (1 + changePercent);
      
      const isBullish = close >= open;
      const bodySize = Math.abs(close - open);
      const wickSize = bodySize * (0.5 + Math.random());
      
      const high = Math.max(open, close) + (isBullish ? wickSize * 0.7 : wickSize);
      const low = Math.min(open, close) - (isBullish ? wickSize : wickSize * 0.7);
      
      const volume = Math.round(80 + Math.random() * 150);
      
      const timeInSeconds = Math.floor((Date.now() - (50 - i) * 60000) / 1000);
      
      currentCandle = {
        time: timeInSeconds,
        timestamp: new Date(Date.now() - (50 - i) * 60000).toLocaleTimeString(),
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: volume,
        ma20: 0,
        ma50: 0,
      };
      
      initialData.push(currentCandle);
    }

    const dataWithIndicators = calculateIndicators(initialData);
    setPriceData(dataWithIndicators);
    lastCandleRef.current = currentCandle;
    setCurrentPrice(currentCandle.close);
  }, [calculateIndicators]);

  // OHLC price updates
  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        setPriceData((prevData) => {
          const newCandle = generateNewCandle();
          setCurrentPrice(newCandle.close);

          const newData = [
            ...prevData.slice(1),
            newCandle,
          ];

          // Recalculate indicators for the new data
          const dataWithIndicators = calculateIndicators(newData);

          // Randomly adjust volatility to simulate market conditions
          if (Math.random() < 0.03) {
            setVolatility((prev) => Math.max(0.001, Math.min(0.01, prev * (Math.random() < 0.5 ? 1.3 : 0.7))));
          }

          return dataWithIndicators;
        });
      }, 2000); // Update every 2 seconds for demo

      return () => clearInterval(interval);
    }
  }, [isTrading, generateNewCandle, calculateIndicators]);

  // Auto-scroll terminal output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Chart dimensions and scaling
  const chartWidth = 800;
  const chartHeight = 400;
  const volumeHeight = 80;
  const padding = useMemo(() => ({ top: 20, right: 60, bottom: 20, left: 20 }), []);
  
  // Calculate chart scales
  const getChartScales = useCallback(() => {
    if (!priceData.length) return { priceScale: () => 0, timeScale: () => 0, volumeScale: () => 0 };
    
    const prices = priceData.flatMap(d => [d.high, d.low]);
    const volumes = priceData.map(d => d.volume);
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const maxVolume = Math.max(...volumes);
    
    const priceRange = maxPrice - minPrice;
    const chartContentHeight = chartHeight - volumeHeight - padding.top - padding.bottom;
    
    const priceScale = (price) => {
      return padding.top + (maxPrice - price) / priceRange * chartContentHeight;
    };
    
    const timeScale = (index) => {
      return padding.left + (index / (priceData.length - 1)) * (chartWidth - padding.left - padding.right);
    };
    
    const volumeScale = (volume) => {
      return chartHeight - padding.bottom - (volume / maxVolume) * volumeHeight;
    };
    
    return { priceScale, timeScale, volumeScale, minPrice, maxPrice };
  }, [priceData, chartWidth, chartHeight, volumeHeight, padding]);

  // Mouse interaction handlers
  const handleMouseMove = (e) => {
    if (!chartContainerRef.current) return;
    
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setShowCrosshair(true);
    
    // Find hovered candle
    const candleWidth = (chartWidth - padding.left - padding.right) / priceData.length;
    const hoveredIndex = Math.floor((x - padding.left) / candleWidth);
    
    if (hoveredIndex >= 0 && hoveredIndex < priceData.length) {
      setHoveredCandle(priceData[hoveredIndex]);
    }
  };
  
  const handleMouseLeave = () => {
    setShowCrosshair(false);
    setHoveredCandle(null);
  };

  const formatPrice = (price) => `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatQuantity = (qty) => qty.toFixed(6);
  const formatPercent = (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  const executeTrade = (type, amount) => {
    const quantity = amount / currentPrice;
    const newPortfolio = { ...portfolio };

    if (type === "buy") {
      if (amount > portfolio.cash) {
        return `Insufficient funds. Available: ${formatPrice(portfolio.cash)}`;
      }
      newPortfolio.cash -= amount;
      newPortfolio.positions.BTC = (newPortfolio.positions.BTC || 0) + quantity;
    } else {
      const currentQuantity = portfolio.positions.BTC || 0;
      if (quantity > currentQuantity) {
        return `Insufficient position. Available: ${formatQuantity(currentQuantity)} BTC`;
      }
      newPortfolio.cash += amount;
      newPortfolio.positions.BTC = currentQuantity - quantity;
    }

    newPortfolio.history.push({
      type,
      price: currentPrice,
      quantity,
      amount,
      timestamp: new Date().toLocaleTimeString(),
    });

    setPortfolio(newPortfolio);
    return `${type.toUpperCase()} ${formatQuantity(quantity)} BTC at ${formatPrice(currentPrice)}`;
  };

  const commands = {
    help: () => ({
      type: "info",
      content: [
        "Professional Trading Commands:",
        "trade start/stop  - Start/stop market simulation",
        "buy <amount>      - Buy BTC (e.g., buy 1000)",
        "sell <amount>     - Sell BTC (e.g., sell 1000)",
        "portfolio         - View portfolio & P&L",
        "history          - View trade history",
        "chart <timeframe> - Switch chart timeframe (1m, 5m, 15m, 1h)",
        "volume on/off     - Toggle volume display",
        "indicators on/off - Toggle technical indicators",
        "ticker           - Show market ticker data",
        "orderbook        - Display order book",
        "clear            - Clear terminal",
        "",
        "Market Data:",
        "Current: BTC/USD",
        "Use arrow keys (↑↓) to navigate command history",
      ],
    }),
    trade: (args) => {
      if (args === "start") {
        setIsTrading(true);
        return {
          type: "info",
          content: "Trading simulation started",
        };
      } else if (args === "stop") {
        setIsTrading(false);
        return {
          type: "info",
          content: "Trading simulation stopped",
        };
      }
    },
    buy: (amount) => ({
      type: "trade",
      content: executeTrade("buy", parseFloat(amount)),
    }),
    sell: (amount) => ({
      type: "trade",
      content: executeTrade("sell", parseFloat(amount)),
    }),
    portfolio: () => ({
      type: "portfolio",
      content: {
        cash: portfolio.cash,
        positions: portfolio.positions,
        total: portfolio.cash + (portfolio.positions.BTC || 0) * currentPrice,
      },
    }),
    history: () => ({
      type: "history",
      content: portfolio.history,
    }),
    clear: () => {
      setOutput([]);
      return null;
    },
    chart: (timeframe) => {
      const validTimeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];
      if (!timeframe || !validTimeframes.includes(timeframe)) {
        return {
          type: "error",
          content: `Invalid timeframe. Available: ${validTimeframes.join(', ')}`,
        };
      }
      setTimeframe(timeframe);
      return {
        type: "info",
        content: `Chart timeframe set to ${timeframe}`,
      };
    },
    volume: (toggle) => {
      if (toggle === "on") {
        setShowVolume(true);
        return { type: "info", content: "Volume display enabled" };
      } else if (toggle === "off") {
        setShowVolume(false);
        return { type: "info", content: "Volume display disabled" };
      }
      return {
        type: "error",
        content: "Usage: volume on/off",
      };
    },
    indicators: (toggle) => {
      if (toggle === "on") {
        setShowIndicators(true);
        return { type: "info", content: "Technical indicators enabled" };
      } else if (toggle === "off") {
        setShowIndicators(false);
        return { type: "info", content: "Technical indicators disabled" };
      }
      return {
        type: "error",
        content: "Usage: indicators on/off",
      };
    },
    ticker: () => {
      const latestCandle = priceData[priceData.length - 1];
      if (!latestCandle) return { type: "error", content: "No market data available" };
      
      const change24h = ((currentPrice - latestCandle.open) / latestCandle.open) * 100;
      const volume24h = priceData.slice(-24).reduce((sum, candle) => sum + candle.volume, 0);
      
      return {
        type: "ticker",
        content: {
          symbol: "BTC/USD",
          price: currentPrice,
          change24h: change24h,
          high24h: Math.max(...priceData.slice(-24).map(c => c.high)),
          low24h: Math.min(...priceData.slice(-24).map(c => c.low)),
          volume24h: volume24h,
        },
      };
    },
    orderbook: () => ({
      type: "orderbook",
      content: {
        bids: Array.from({ length: 5 }, (_, i) => ({
          price: currentPrice - (i + 1) * (5 + Math.random() * 10),
          size: (Math.random() * 2 + 0.1).toFixed(4),
        })),
        asks: Array.from({ length: 5 }, (_, i) => ({
          price: currentPrice + (i + 1) * (5 + Math.random() * 10),
          size: (Math.random() * 2 + 0.1).toFixed(4),
        })),
      },
    }),
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const [cmd, ...args] = command.trim().toLowerCase().split(" ");

    // Add to command history
    if (command.trim()) {
      setCommandHistory((prev) => [command, ...prev.slice(0, 49)]); // Keep last 50 commands
      setHistoryIndex(-1);
    }

    setOutput((prev) => [
      ...prev,
      { type: "command", content: `> ${command}` },
    ]);

    if (commands[cmd]) {
      const result = commands[cmd](args.join(" "));
      if (result) {
        setOutput((prev) => [...prev, result]);
      }
    } else if (command.trim()) {
      setOutput((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${command}. Type 'help' for available commands.`,
        },
      ]);
    }

    setCommand("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };



  const renderOutput = (item) => {
    switch (item.type) {
      case "command":
        return <div className="text-green-500">{item.content}</div>;
      case "error":
        return <div className="text-red-500">{item.content}</div>;
      case "trade":
        return <div className="text-yellow-500">{item.content}</div>;
      case "portfolio":
        const totalValue = item.content.cash + (item.content.positions.BTC || 0) * currentPrice;
        const pnl = totalValue - 100000; // Initial balance
        const pnlPercent = (pnl / 100000) * 100;
        
        return (
          <div className="border border-green-900 p-3 bg-gray-900/50">
            <div className="text-green-400 mb-2 flex items-center gap-2">
              <TrendingUp size={14} />
              Portfolio Summary
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>Cash: <span className="text-white">{formatPrice(item.content.cash)}</span></div>
              <div>BTC: <span className="text-orange-400">{formatQuantity(item.content.positions.BTC || 0)}</span></div>
              <div>Total Value: <span className="text-white">{formatPrice(totalValue)}</span></div>
              <div className={`font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                P&L: {formatPercent(pnlPercent)} ({formatPrice(pnl)})
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="border border-green-900 p-2">
            <div className="text-green-500 mb-2">Trade History:</div>
            {item.content.map((trade, idx) => (
              <div key={idx} className="text-xs grid grid-cols-4 gap-2">
                <span>{trade.timestamp}</span>
                <span
                  className={
                    trade.type === "buy" ? "text-green-500" : "text-red-500"
                  }
                >
                  {trade.type.toUpperCase()}
                </span>
                <span>{formatQuantity(trade.quantity)} BTC</span>
                <span>${formatPrice(trade.price)}</span>
              </div>
            ))}
          </div>
        );
      case "ticker":
        return (
          <div className="border border-green-900 p-3 bg-gray-900/50">
            <div className="text-green-400 mb-2 flex items-center gap-2">
              <Activity size={14} />
              Market Ticker - {item.content.symbol}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Price</div>
                <div className="text-white text-lg font-mono">{formatPrice(item.content.price)}</div>
              </div>
              <div>
                <div className="text-gray-400">24h Change</div>
                <div className={`font-bold ${item.content.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercent(item.content.change24h)}
                </div>
              </div>
              <div>
                <div className="text-gray-400">24h Volume</div>
                <div className="text-white">{item.content.volume24h.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400">24h High</div>
                <div className="text-green-400">{formatPrice(item.content.high24h)}</div>
              </div>
              <div>
                <div className="text-gray-400">24h Low</div>
                <div className="text-red-400">{formatPrice(item.content.low24h)}</div>
              </div>
            </div>
          </div>
        );
      case "orderbook":
        return (
          <div className="border border-green-900 p-3 bg-gray-900/50">
            <div className="text-green-400 mb-3 flex items-center gap-2">
              <Terminal size={14} />
              Order Book - BTC/USD
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <div className="text-red-400 mb-2 font-bold">ASKS (SELL)</div>
                {item.content.asks.reverse().map((ask, i) => (
                  <div key={i} className="flex justify-between text-red-300">
                    <span>{formatPrice(ask.price)}</span>
                    <span>{ask.size}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-green-400 mb-2 font-bold">BIDS (BUY)</div>
                {item.content.bids.map((bid, i) => (
                  <div key={i} className="flex justify-between text-green-300">
                    <span>{formatPrice(bid.price)}</span>
                    <span>{bid.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-white">
            {Array.isArray(item.content)
              ? item.content.map((line, idx) => <div key={idx}>{line}</div>)
              : item.content}
          </div>
        );
    }
  };

  // Market calculations for display
  const currentCandle = priceData[priceData.length - 1];
  const previousCandle = priceData[priceData.length - 2];
  
  const priceChange = currentCandle && previousCandle 
    ? currentCandle.close - previousCandle.close 
    : 0;
  const priceChangePercent = previousCandle 
    ? (priceChange / previousCandle.close) * 100 
    : 0;

  return (
    <section id="trading" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">
              TRADING_TERMINAL <span className="text-green-600">{`<F1>`}</span>
            </span>
          </div>
        </div>

        {/* TradingView Professional Chart */}
        <div className="border border-green-900 bg-black mb-4">
          {/* Chart Header */}
          <div className="border-b border-green-900 p-3 flex justify-between items-center bg-gray-900/30">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-white">BTC/USD</span>
              <span className="text-xs bg-green-600 px-2 py-1 rounded text-black font-bold">{timeframe}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-mono font-bold ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {formatPrice(currentPrice)}
                </span>
                <div className={`flex items-center gap-1 text-sm ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="font-bold">{formatPercent(priceChangePercent)}</span>
                  <span>({priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)})</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1 ${showVolume ? "text-green-400" : "text-gray-500"}`}>
                <div className="w-2 h-2 bg-current rounded"></div>
                <span>VOL</span>
              </div>
              <div className={`flex items-center gap-1 ${showIndicators ? "text-yellow-400" : "text-gray-500"}`}>
                <div className="w-2 h-2 bg-current rounded"></div>
                <span>MA</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-current rounded animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </div>
          </div>
          
          {/* Custom TradingView-Style Chart */}
          <div className="p-2 bg-black">
            <div 
              ref={chartContainerRef}
              className="w-full relative"
              style={{ height: '400px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <svg
                width={chartWidth}
                height={chartHeight}
                className="w-full h-full"
                style={{ background: '#1e1e1e' }}
              >
                {/* Grid Lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2B2B43" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Chart Content */}
                {priceData.length > 0 && (() => {
                  const { priceScale, timeScale, volumeScale, minPrice, maxPrice } = getChartScales();
                  const candleWidth = (chartWidth - padding.left - padding.right) / priceData.length;
                  const wickWidth = 1;
                  
                  return (
                    <g>
                      {/* Volume Bars */}
                      {showVolume && priceData.map((candle, index) => {
                        const x = timeScale(index);
                        const volumeHeight = chartHeight - padding.bottom - volumeScale(candle.volume);
                        const color = candle.close >= candle.open ? '#26a69a' : '#ef5350';
                        
                        return (
                          <rect
                            key={`volume-${index}`}
                            x={x - candleWidth/4}
                            y={volumeScale(candle.volume)}
                            width={candleWidth/2}
                            height={volumeHeight}
                            fill={color}
                            opacity="0.3"
                          />
                        );
                      })}
                      
                      {/* Moving Averages */}
                      {showIndicators && (
                        <>
                          {/* MA20 Line */}
                          <polyline
                            points={priceData
                              .filter(candle => candle.ma20 > 0)
                              .map((candle, index) => `${timeScale(index)},${priceScale(candle.ma20)}`)
                              .join(' ')}
                            fill="none"
                            stroke="#ffa726"
                            strokeWidth="2"
                          />
                          
                          {/* MA50 Line */}
                          <polyline
                            points={priceData
                              .filter(candle => candle.ma50 > 0)
                              .map((candle, index) => `${timeScale(index)},${priceScale(candle.ma50)}`)
                              .join(' ')}
                            fill="none"
                            stroke="#ab47bc"
                            strokeWidth="2"
                          />
                        </>
                      )}
                      
                      {/* Candlesticks */}
                      {priceData.map((candle, index) => {
                        const x = timeScale(index);
                        const openY = priceScale(candle.open);
                        const closeY = priceScale(candle.close);
                        const highY = priceScale(candle.high);
                        const lowY = priceScale(candle.low);
                        
                        const isBullish = candle.close >= candle.open;
                        const bodyHeight = Math.abs(closeY - openY);
                        const bodyTop = Math.min(openY, closeY);
                        
                        const color = isBullish ? '#26a69a' : '#ef5350';
                        const isLatest = index === priceData.length - 1;
                        
                        return (
                          <g key={`candle-${index}`} className={isLatest && isTrading ? 'animate-pulse' : ''}>
                            {/* Wick */}
                            <line
                              x1={x}
                              y1={highY}
                              x2={x}
                              y2={lowY}
                              stroke={color}
                              strokeWidth={wickWidth}
                              style={{
                                transition: isLatest ? 'all 0.3s ease-in-out' : 'none'
                              }}
                            />
                            
                            {/* Body */}
                            <rect
                              x={x - candleWidth/4}
                              y={bodyTop}
                              width={candleWidth/2}
                              height={Math.max(bodyHeight, 1)}
                              fill={isBullish ? color : color}
                              stroke={color}
                              strokeWidth="1"
                              style={{
                                transition: isLatest ? 'all 0.3s ease-in-out' : 'none'
                              }}
                            />
                            
                            {/* Glow effect for latest candle */}
                            {isLatest && isTrading && (
                              <rect
                                x={x - candleWidth/4}
                                y={bodyTop}
                                width={candleWidth/2}
                                height={Math.max(bodyHeight, 1)}
                                fill="none"
                                stroke={color}
                                strokeWidth="2"
                                opacity="0.4"
                                style={{
                                  filter: `drop-shadow(0 0 4px ${color})`
                                }}
                              />
                            )}
                          </g>
                        );
                      })}
                      
                      {/* Crosshair */}
                      {showCrosshair && (
                        <g>
                          <line
                            x1={mousePosition.x}
                            y1={padding.top}
                            x2={mousePosition.x}
                            y2={chartHeight - padding.bottom}
                            stroke="#758696"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                            opacity="0.8"
                          />
                          <line
                            x1={padding.left}
                            y1={mousePosition.y}
                            x2={chartWidth - padding.right}
                            y2={mousePosition.y}
                            stroke="#758696"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                            opacity="0.8"
                          />
                        </g>
                      )}
                      
                      {/* Price Scale */}
                      <g>
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                          const price = minPrice + (maxPrice - minPrice) * (1 - ratio);
                          const y = padding.top + ratio * (chartHeight - volumeHeight - padding.top - padding.bottom);
                          
                          return (
                            <g key={`price-${index}`}>
                              <line
                                x1={chartWidth - padding.right}
                                y1={y}
                                x2={chartWidth - padding.right + 5}
                                y2={y}
                                stroke="#485158"
                                strokeWidth="1"
                              />
                              <text
                                x={chartWidth - padding.right + 8}
                                y={y + 4}
                                fill="#d1d4dc"
                                fontSize="10"
                                fontFamily="monospace"
                              >
                                {formatPrice(price)}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                      
                      {/* Time Scale */}
                      <g>
                        {priceData.filter((_, index) => index % 10 === 0).map((candle, filteredIndex) => {
                          const originalIndex = filteredIndex * 10;
                          const x = timeScale(originalIndex);
                          
                          return (
                            <g key={`time-${originalIndex}`}>
                              <line
                                x1={x}
                                y1={chartHeight - padding.bottom}
                                x2={x}
                                y2={chartHeight - padding.bottom + 5}
                                stroke="#485158"
                                strokeWidth="1"
                              />
                              <text
                                x={x}
                                y={chartHeight - padding.bottom + 15}
                                fill="#d1d4dc"
                                fontSize="9"
                                fontFamily="monospace"
                                textAnchor="middle"
                              >
                                {candle.timestamp}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    </g>
                  );
                })()}
              </svg>
              
              {/* Hover Data Panel */}
              {hoveredCandle && (
                <div className="absolute top-2 left-2 bg-gray-900 border border-green-900 p-2 text-xs font-mono">
                  <div className="text-green-400 mb-1">OHLC Data</div>
                  <div className="grid grid-cols-2 gap-2 text-white">
                    <span>O: {formatPrice(hoveredCandle.open)}</span>
                    <span>H: {formatPrice(hoveredCandle.high)}</span>
                    <span>L: {formatPrice(hoveredCandle.low)}</span>
                    <span>C: {formatPrice(hoveredCandle.close)}</span>
                    <span>Vol: {hoveredCandle.volume}</span>
                    <span>Time: {hoveredCandle.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chart Info Bar */}
          <div className="border-t border-green-900 p-2 bg-gray-900/20">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <div className="flex gap-6">
                <span>Timeframe: <span className="text-white">{timeframe}</span></span>
                {showIndicators && (
                  <>
                    <span>MA20: <span className="text-orange-400">●</span></span>
                    <span>MA50: <span className="text-purple-400">●</span></span>
                  </>
                )}
                {showVolume && <span>Volume: <span className="text-blue-400">●</span></span>}
              </div>
              <div className="flex gap-4">
                <span>Market: <span className={`font-bold ${isTrading ? 'text-green-400' : 'text-yellow-400'}`}>{isTrading ? 'LIVE' : 'PAUSED'}</span></span>
                <span>Updates: <span className="text-white">2s</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="border border-green-900 bg-black p-4">
          <div ref={outputRef} className="h-[30vh] overflow-y-auto space-y-2 mb-4">
            {output.map((item, idx) => (
              <div key={idx} className="mb-2">
                {renderOutput(item)}
              </div>
            ))}
          </div>

          {/* Command Input */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 border-t border-green-900 pt-4"
          >
            <span className="text-green-500">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Type 'help' for available commands..."
              autoFocus
            />
          </form>
        </div>

        {/* Quick Commands */}
        <div className="border border-green-900 mt-4 p-3 bg-gray-900/30">
          <div className="text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 font-bold">Quick Commands:</span>
              <span className="text-green-600">Press Enter to execute</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <span>trade start/stop, buy 1000, sell 500</span>
              <span>portfolio, ticker, orderbook, history</span>
              <span>chart 1m/5m/15m, volume on/off</span>
              <span>indicators on/off, clear</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
