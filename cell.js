class cell
{
    constructor( i, j, size )
    {
        this.i = i
        this.j = j
        
        this.x = i * size
        this.y = j * size
        this.size = size
        
        this.walls = [ true, true, true, true ] //left, up, right, bottom
        this.visited = false
        this.color = color( 255, 255, 255 )
        
        this.f = 99999999
        this.g = 99999999
        this.previous = undefined
        
        this.updated_open = false
        this.updated_closed = false
    }
    
    set_color( new_color )
    {
        this.color = new_color
    }
    
    get_neighbours( grid )
    {
        var arr = []
        
        if ( this.i > 0 && !this.walls[ 0 ] )
            arr.push( grid[ this.i - 1 ][ this.j ] )
        
        if ( this.j > 0 && !this.walls[ 1 ] )
            arr.push( grid[ this.i ][ this.j - 1 ] )
        
        if ( this.i < ( width / this.size ) - 1 && !this.walls[ 2 ] )
            arr.push( grid[ this.i + 1 ][ this.j ] )
        
        if ( this.j < ( height / this.size ) - 1 && !this.walls[ 3 ] )
            arr.push( grid[ this.i ][ this.j + 1 ] )
        
        return arr
    }
    
    set_visited( )
    {
        this.visited = true
    }
    
    is_visited( )
    {
        return this.visited
    }
    
    remove_wall( delta_x, delta_y )
    {
        if ( delta_x == -1 )
            this.walls[ 0 ] = false
        
        if ( delta_x == 1 )
            this.walls[ 2 ] = false
        
        if ( delta_y == -1 )
            this.walls[ 1 ] = false
        
        if ( delta_y == 1 )
            this.walls[ 3 ] = false
    }
    
    render( current )
    {
        if ( current.x == this.i && current.y == this.j )
        {
            noStroke( )
            fill( 200, 100, 200 )
            rect( this.x, this.y, this.size, this.size )
        }
        else if ( this.visited )
        {
            noStroke( )
            fill( this.color )
            rect( this.x, this.y, this.size, this.size )
        }
        
        stroke( 0 )
        strokeWeight( 2 )
        
        if ( this.walls[ 0 ] )
            line( this.x, this.y, this.x, this.y + this.size )
        
        if ( this.walls[ 1 ] )
            line( this.x, this.y, this.x + this.size, this.y )
        
        if ( this.walls[ 2 ] )
            line( this.x + this.size, this.y, this.x + this.size, this.y + this.size )
        
        if ( this.walls[ 3 ] )
            line( this.x, this.y + this.size, this.x + this.size, this.y + this.size )
    }
    
    update( current )
    {
        if ( current.x == this.i && current.y == this.j )
        {
            noStroke( )
            fill( 200, 100, 200 )
            rect( this.x, this.y, this.size, this.size )
        }
        else if ( this.visited )
        {
            noStroke( )
            fill( this.color )
            rect( this.x, this.y, this.size, this.size )
        }
        
        stroke( 0 )
        strokeWeight( 2 )
        
        if ( this.walls[ 0 ] )
            line( this.x, this.y, this.x, this.y + this.size )
        
        if ( this.walls[ 1 ] )
            line( this.x, this.y, this.x + this.size, this.y )
        
        if ( this.walls[ 2 ] )
            line( this.x + this.size, this.y, this.x + this.size, this.y + this.size )
        
        if ( this.walls[ 3 ] )
            line( this.x, this.y + this.size, this.x + this.size, this.y + this.size )
    }
}