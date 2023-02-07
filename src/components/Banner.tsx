import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from '../assets/img/header-img.svg';

export const Banner = () => {
    // This state indicates the current index of the text to be typed
    const [loopNum, setLoopNum] = useState<number>(0);
    // This state indicates whether the text is being deleted or typing
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    // This array contains the text to be typed
    const toRotate = [' Web Developer', 'Web Designer', 'Elmi\'s Developer'];
    // This state indicates the portion of the text to be typed
    const [text, setText] = useState<string>('');
    // This state indicates the speed of typing
    const [delta, setDelta] = useState<number>(300 - Math.random() * 100);
    // This indicates how mutch time should pass before the next text is typed
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);
        return () => {clearInterval(ticker)};
    }, [text]);

    const tick = () => {
        // The loop number is constantly increasing so once we reach the end of the array we reset it back to the first element
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
        setText(updatedText);

        if(isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if(!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if(isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }


    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline"> Welcome to my Portfolio</span>
                        <h1>{`I'm a `}<span className="wrap">{text}</span></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <button onClick={() => console.log('connect')}><span>Let's Connect <ArrowRightCircle size={25} /></span></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                        </Col>
                    </Row>
            </Container>
            </section>
    )
};