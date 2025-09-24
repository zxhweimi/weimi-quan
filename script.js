// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initAttractionChart();
    
    // 初始化支付功能
    initPaymentFeatures();
    
    // 添加动画效果
    addAnimations();
});

// 初始化吸引力图表
function initAttractionChart() {
    const ctx = document.getElementById('attractionChart');
    if (!ctx) return;
    
    // 创建吸引力趋势图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            datasets: [{
                label: '魅力指数',
                data: [8.2, 8.5, 8.8, 9.1, 9.3, 9.6, 9.8],
                borderColor: '#e91e63',
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#e91e63',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: '关注度',
                data: [6.5, 7.2, 7.8, 8.1, 8.4, 8.7, 9.0],
                borderColor: '#ff69b4',
                backgroundColor: 'rgba(255, 105, 180, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff69b4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 5,
                    max: 10,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 初始化支付功能
function initPaymentFeatures() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountDisplay = document.getElementById('amount');
    const statusIndicator = document.querySelector('.status-indicator');
    const customAmountInput = document.getElementById('customAmount');
    const setCustomAmountBtn = document.getElementById('setCustomAmount');
    
    // 金额按钮点击事件
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            amountDisplay.textContent = amount + '.00';
            
            // 更新按钮状态
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新支付状态和二维码
            updatePaymentStatus('准备支付');
            updateQRCode(amount);
        });
    });
    
    // 自定义金额设置
    setCustomAmountBtn.addEventListener('click', function() {
        const customAmount = parseFloat(customAmountInput.value);
        if (customAmount && customAmount > 0) {
            amountDisplay.textContent = customAmount.toFixed(2);
            
            // 清除所有按钮的激活状态
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // 更新支付状态和二维码
            updatePaymentStatus('准备支付');
            updateQRCode(customAmount);
        }
    });
    
    // 回车键设置自定义金额
    customAmountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            setCustomAmountBtn.click();
        }
    });
    
    // 模拟支付状态更新
    setInterval(() => {
        const currentAmount = amountDisplay.textContent;
        if (currentAmount !== '0.00') {
            // 随机更新状态
            const statuses = ['等待支付', '扫描中...', '支付中...', '支付成功'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            updatePaymentStatus(randomStatus);
        }
    }, 5000);
}

// 更新支付状态
function updatePaymentStatus(status) {
    const statusIndicator = document.querySelector('.status-indicator span');
    const statusIcon = document.querySelector('.status-indicator i');
    
    if (statusIndicator) {
        statusIndicator.textContent = status;
    }
    
    // 根据状态更新图标颜色
    if (statusIcon) {
        if (status.includes('成功')) {
            statusIcon.style.color = '#4caf50';
            statusIcon.className = 'fas fa-check-circle';
        } else if (status.includes('支付中') || status.includes('扫描中')) {
            statusIcon.style.color = '#ff9800';
            statusIcon.className = 'fas fa-spinner fa-spin';
        } else {
            statusIcon.style.color = '#ffa726';
            statusIcon.className = 'fas fa-circle';
        }
    }
}

// 更新二维码显示
function updateQRCode(amount) {
    const qrImage = document.querySelector('.qr-image');
    const amountDisplay = document.getElementById('amount');
    
    // 生成对应金额的微信支付二维码
    generateWechatQRCode(amount);
    
    // 添加视觉反馈
    if (qrImage) {
        qrImage.style.transform = 'scale(1.05)';
        qrImage.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.4)';
        
        setTimeout(() => {
            qrImage.style.transform = 'scale(1)';
            qrImage.style.boxShadow = '0 2px 8px rgba(255, 182, 193, 0.3)';
        }, 300);
    }
    
    // 显示金额确认信息
    showAmountConfirmation(amount);
}

// 生成微信支付二维码
function generateWechatQRCode(amount) {
    console.log(`正在切换到金额为 ¥${amount} 的微信支付二维码...`);
    
    // 根据金额选择对应的二维码
    const qrCodeMap = {
        10: 'wechat-qr-10.png',
        20: 'wechat-qr-20.png', 
        50: 'wechat-qr-50.png',
        100: 'wechat-qr-100.png'
    };
    
    const qrImage = document.querySelector('.qr-image');
    
    if (qrCodeMap[amount]) {
        // 立即切换二维码，无延迟
        qrImage.src = qrCodeMap[amount];
        // 简化状态提示，减少显示时间
        showQuickStatus(`¥${amount} 二维码已切换`);
    } else {
        // 如果没有对应金额的二维码，显示提示
        showQRSetupInstructions(amount);
    }
}

// 快速状态提示
function showQuickStatus(message) {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'quick-status';
    statusDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e91e63;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            z-index: 2000;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
            animation: slideIn 0.2s ease-out;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 1秒后自动移除
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 1000);
}

// 显示二维码设置说明
function showQRSetupInstructions(amount) {
    const instructions = document.createElement('div');
    instructions.className = 'qr-setup-instructions';
    instructions.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 10px;
            z-index: 3000;
            font-weight: 500;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid #e91e63;
        ">
            <div style="margin-bottom: 1rem; font-size: 1.2rem; color: #e91e63;">📱 设置说明</div>
            <div style="margin-bottom: 1rem;">
                要为 ¥${amount} 设置专用二维码：
            </div>
            <div style="text-align: left; margin-bottom: 1rem;">
                1. 打开微信，点击"+"号<br>
                2. 选择"收付款"<br>
                3. 选择"二维码收款"<br>
                4. 设置金额为 ¥${amount}<br>
                5. 保存二维码图片<br>
                6. 将图片命名为 wechat-qr-${amount}.png
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #e91e63;
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            ">我知道了</button>
        </div>
    `;
    
    document.body.appendChild(instructions);
}

// 显示二维码生成状态
function showQRGenerationStatus(message) {
    // 创建状态提示
    const statusDiv = document.createElement('div');
    statusDiv.className = 'qr-generation-status';
    statusDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            z-index: 2000;
            font-weight: 600;
            text-align: center;
            min-width: 200px;
        ">
            <div style="margin-bottom: 0.5rem;">🔄</div>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 2秒后自动移除
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 2000);
}

// 显示金额确认信息
function showAmountConfirmation(amount) {
    // 创建临时提示
    const confirmation = document.createElement('div');
    confirmation.className = 'amount-confirmation';
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e91e63;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
            z-index: 1000;
            font-weight: 600;
            font-size: 0.9rem;
            animation: slideIn 0.2s ease-out;
        ">
            💰 ¥${amount}
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // 1.5秒后自动移除
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.parentNode.removeChild(confirmation);
        }
    }, 1500);
}

// 添加动画效果
function addAnimations() {
    // 统计数字动画
    animateNumbers();
    
    // 卡片悬停效果
    addCardHoverEffects();
    
    // 页面加载动画
    addPageLoadAnimations();
}

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                animateValue(target, 0, numericValue, 2000, isPercentage);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(number => observer.observe(number));
}

// 数字递增动画
function animateValue(element, start, end, duration, isPercentage = false) {
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = isPercentage ? current + '%' : current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// 卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .beauty-card, .qr-container');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 页面加载动画
function addPageLoadAnimations() {
    const elements = document.querySelectorAll('.left-panel, .right-panel');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(' + (index === 0 ? '-50px' : '50px') + ')';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// 添加一些额外的交互功能
function addExtraFeatures() {
    // 二维码点击放大效果
    const qrImage = document.querySelector('.qr-image');
    if (qrImage) {
        qrImage.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // 美女图片画廊功能
    const mainImg = document.querySelector('.main-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImg && thumbnails.length > 0) {
        const images = ['beauty-1.jpg', 'beauty-2.jpg', 'beauty-3.jpg', 'beauty-4.jpg', 'beauty-5.jpg'];
        let currentIndex = 0;
        
        // 缩略图点击切换
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                // 更新主图片
                currentIndex = index;
                mainImg.src = images[currentIndex];
                
                // 更新缩略图激活状态
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
                
                // 添加切换动画
                mainImg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    mainImg.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        mainImg.style.transform = 'scale(1)';
                    }, 150);
                }, 150);
            });
        });
        
        // 主图片点击切换到下一张
        mainImg.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            this.src = images[currentIndex];
            
            // 更新缩略图激活状态
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[currentIndex].classList.add('active');
            
            // 添加切换动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 150);
        });
        
        // 自动轮播（每5秒切换一次）
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            mainImg.src = images[currentIndex];
            
            // 更新缩略图激活状态
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[currentIndex].classList.add('active');
        }, 5000);
    }
}

// 添加心跳动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes heartbeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.1); }
        50% { transform: scale(1.05); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .amount-btn.active {
        background: #d63384;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
    }
`;
document.head.appendChild(style);

// 复制QQ号功能
function copyQQ() {
    const qqNumber = '3472132884';
    
    // 尝试使用现代API复制到剪贴板
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(qqNumber).then(() => {
            showCopySuccess('QQ号已复制到剪贴板！');
        }).catch(() => {
            fallbackCopy(qqNumber);
        });
    } else {
        fallbackCopy(qqNumber);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess('QQ号已复制到剪贴板！');
    } catch (err) {
        showCopyError('复制失败，请手动复制：' + text);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopySuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'copy-success';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            ✅ ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// 显示复制失败提示
function showCopyError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'copy-error';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            ❌ ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// 初始化额外功能
document.addEventListener('DOMContentLoaded', addExtraFeatures);

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 数字键1-4选择金额
    if (e.key >= '1' && e.key <= '4') {
        const buttons = document.querySelectorAll('.amount-btn');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
    
    // 空格键重置金额
    if (e.key === ' ') {
        document.getElementById('amount').textContent = '0.00';
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        updatePaymentStatus('等待支付');
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('amount-btn')) {
            e.target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('amount-btn')) {
            e.target.style.transform = '';
        }
    });
}
